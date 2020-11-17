import { NextFunction, Request, Response } from "express";

export namespace Middlewares{

    export class Auth {
        isAuth(req: Request, res: Response, next: NextFunction) {
            if (req.isAuthenticated()) {
                return next();
            }
    
            req.flash('error_msg', "You aren't authenticated");
            res.redirect("/auth/login");
        }
    }
}