import { Request, Response } from "express";
import * as passport from "passport";

class LoginCotroller{
    index(req: Request, res: Response){
        var errors = req.cookies['errors'];
        var success = req.cookies['success'];
        res.clearCookie("errors", { httpOnly: true });
        res.clearCookie("success", { httpOnly: true });
        return res.render('auth/login',{
            layout: '',
            css: ['bootstrap.css',
                'all.min.css'],
            vendors: ['styles/style.css'],
            js: ['jquery.min.js', 
                'bootstrap.js'],
            errors: errors,
            success: success
        });
    }
    login(req: Request, res: Response,next){
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req,res,next);
    }
}

export default new LoginCotroller();