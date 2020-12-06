import { User } from "@models/User";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

class Auth {
    async isAuth(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', "You aren't authenticated");
        res.redirect("/auth/login");
    }
}

export default new Auth();