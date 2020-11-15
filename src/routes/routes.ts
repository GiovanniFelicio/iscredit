import userRoutes from './UserRoutes';
import authRoutes from './AuthRoutes';
import eleicaoRoutes from './EleicaoRoutes';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/eleicao', eleicaoRoutes);

export default routes;
