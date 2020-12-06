
import { User } from 'src/app/models/User';
import { Request, Response } from 'express';
import { HttpRequest } from '@models/decorators/HttpRequest';
import { Controller } from '@decorators/Controller'
import Auth from '@middlewares/auth';
import Util from '@utils/Utils';

@Controller('/')
export class TesteController {

    @HttpRequest('get', '/', [Auth.isAuth])
    public index(req: Request, res: Response) {        
        res.send("ok")
    }
}