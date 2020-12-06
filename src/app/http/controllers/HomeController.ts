
import { User } from 'src/app/models/User';
import { Request, Response } from 'express';
import { HttpRequest } from '@models/decorators/HttpRequest';
import { Controller } from '@decorators/Controller'
import Auth from '@middlewares/auth';
import { getRepository } from 'typeorm';

@Controller('/')
export class HomeController {

    @HttpRequest('get', '/', [Auth.isAuth])
    public async index(req: Request, res: Response) {                

        getRepository(User).findOne(req.user['id'])
            .then((user: User) => {
                let {id,name,email,document} = user;
                res.status(200).json({
                    id: id,
                    name: name,
                    email: email,
                    document: document
                });
            })
            .catch((err) => {
                res.status(500);
            });

    }
}