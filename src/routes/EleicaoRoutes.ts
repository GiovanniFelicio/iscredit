import { Request, Response, Router } from 'express'
import EleicaoController from 'src/controllers/EleicaoController';
import { getRepository } from "typeorm"
// import {Middlewares} from '../middlewares/auth'

const routes = Router();

// const auth = new Middlewares.Auth();

// routes.get('/test', auth.isAuth, (req, res) => {
//     res.send("Ok");
// });

routes.get('/', EleicaoController.index);

export default routes;