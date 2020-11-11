import { User } from '@models/User';
import { Request, Response } from 'express';


class UserController {
    public create(req: Request, res: Response) {
        res.send("O");
    }
}

export default new UserController();