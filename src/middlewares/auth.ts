import { NextFunction, Request, Response } from "express";


declare namespace e{

     isAuth (req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
    
        req.flash('error_msg', "You aren't authenticated");
        res.redirect("/login");
    }
}
export default { 
}