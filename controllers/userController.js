import routes from '../routes';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = (req, res) => {
  const {
    body: { name, email, password, passwordConfirm }
  } = req;
  if (password !== passwordConfirm) {
    res.status(400).render('join', { pageTitle: 'Join' });
  } else {
    // TODO: Register User
    // TODO: Log User In
    res.redirect(routes.home);
  }
};
export const getLogin = (req, res) => res.render('login', { pageTitle: 'Login' });
export const postLogin = (req, res) => {
  console.log(req.body);
  res.redirect(routes.home);
};
export const logout = (req, res) => res.render('logout', { pageTitle: 'Logout' });
export const usersDetail = (req, res) => res.render('userDetail', { pageTitle: 'User Detail' });
export const editProfile = (req, res) => res.render('editProfile', { pageTitle: 'Edit Profile' });
export const changePassword = (req, res) => res.render('changePassword', { pageTitle: 'Change Password' });
