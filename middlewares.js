import routes from './routes';
import multer from 'multer';

const multerVideo = multer({ dest: 'upload/videos/' });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.user = {
    id: 1,
    isAuthenticated: true
  };
  next();
};

export const uploadVideo = multerVideo.single('videoFile');
