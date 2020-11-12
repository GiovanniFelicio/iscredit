import { Request, Response, Router } from 'express'
import UserController from 'src/controllers/UserController';
import { getRepository } from "typeorm"
import {Middlewares} from '../middlewares/auth'

const routes = Router();

const auth = new Middlewares.Auth();

routes.get('/test', auth.isAuth, (req, res) => {
    res.send("Ok");
});

routes.get('/:id', auth.isAuth, UserController.create);

export default routes;