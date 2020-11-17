import { User } from 'src/app/models/User';
import { Request, Response } from 'express';
import { HttpRequest } from '@decorators/HttpRequest';
import {Controller} from '@decorators/Controller'

@Controller('/user')
export class UserController {

    @HttpRequest('post','/')
    public index(req: Request, res: Response) {
        console.log(req.body);
        res.send("Hello World");
    }

    public create(req: Request, res: Response) {
        res.send("O");
    }
}