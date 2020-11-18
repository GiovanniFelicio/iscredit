import { NextFunction, Request, Response } from "express";

class Auth {
    isAuth(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', "You aren't authenticated");
        res.redirect("/auth/login");
    }
}

export default new Auth();