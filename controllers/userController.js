import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, passwordConfirm }
  } = req;
  if (password !== passwordConfirm) {
    res.status(400).render('join', { pageTitle: 'Join' });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_accessToken, _refreshToken, profile, cb) => {
  const {
    _json: { id, name, email, avatar_url: avatarUrl }
  } = profile;

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl,
      githubId: id
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};
export const usersDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate('videos');
    console.log(user);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    await User.findByIdAndUpdate(req.user.id, { name, email, ...(file && { avatarUrl: file.path }) });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};
export const getChangePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPasswordConfirm }
  } = req;
  try {
    if (newPassword !== newPasswordConfirm) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(`/users${routes.changePassword}`);
  }
};
