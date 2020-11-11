import { Request, Response, Router } from 'express'
import UserController from 'src/controllers/UserController';
import { getRepository } from "typeorm"

const routes = Router();

routes.get('/test', (req, res) => {
    res.send("Ok");
});

routes.get('/:id', UserController.create);


export default routes;