import userRoutes from './UserRoutes';
import authRoutes from './AuthRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
