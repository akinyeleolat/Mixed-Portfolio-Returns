import { Router } from 'express';
import userRoute from './user';
import userTypeRoute from './usertype';
import performanceRoute from './performance';
import { verifyUser } from '../../middlewares/validations/user';

const router = Router();

const routeList = [
  { path: '/usertype', route: userTypeRoute },
  { path: '/performance', route: performanceRoute }
];
router.use('/auth', userRoute);

router.use('*', verifyUser);

routeList.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
