import {Controller} from '@decorators/Controller'
import { HttpRequest } from '@models/decorators/HttpRequest';
import { EnumRoleUser } from '@models/enums/EnumRoleUser';
import { User } from '@models/User';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

@Controller('/auth')
export class RegisterController{

    @HttpRequest('post', '/register')
    index(req:Request, res:Response, next: NextFunction) {

        let repository = getRepository(User);

        let {name, email, document, password} = req.body;

        let user = new User();

        user.name = name;
        user.email = email;
        user.document = document;
        user.password = password;
        user.role = EnumRoleUser.USER;

        user = repository.create(user);

        repository.save(user).then(() => {
            res.status(200);
            res.send("User successfully registered");
        })
        .catch((err)=>{
            console.log(err)
            res.status(500);
            res.send("Error when registering");
        })    
    }
}