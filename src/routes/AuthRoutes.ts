import { Request, Response, Router } from 'express'
import LoginController from 'src/controllers/LoginController';

const routes = Router();

routes.get('/login', LoginController.index);
routes.post('/login', LoginController.login);

export default routes;