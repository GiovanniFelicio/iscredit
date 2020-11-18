import { User } from 'src/app/models/User';
import { Request, Response } from 'express';
import { HttpRequest } from '@models/decorators/HttpRequest';
import { Controller } from '@decorators/Controller'
import Auth from '@middlewares/auth';

@Controller('/user')
export class UserController {

    @HttpRequest('post', '/')
    public index(req: Request, res: Response) {
        console.log(req.body);
        res.send("Hello World");
    }

    @HttpRequest('get', '/', [Auth.isAuth])
    public create(req: Request, res: Response) {
        res.send("O");
    }
}