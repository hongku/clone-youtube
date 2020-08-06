import passport from 'passport';
import GithubStrategy from 'passport-github';
import User from './models/User';
import { githubLoginCallback } from './controllers/userController';
import routes from './routes';

passport.use(User.createStrategy());

const callbackHost = process.env.PRODUCTION ? 'https://still-sea-64555.herokuapp.com' : 'http://localhost:4000';

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${callbackHost}${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
