import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { BlogRoutes } from '../modules/blogs/blog.routes';
import { AuthRouters } from '../modules/auth/auth.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
