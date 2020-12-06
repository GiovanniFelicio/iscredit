import { User } from "@models/User";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

class Auth {
    async isAuth(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        
        res.status(403);
        res.send("");
    }
}

export default new Auth();