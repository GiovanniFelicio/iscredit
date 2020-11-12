import { Request, Response } from "express";
import * as passport from "passport";

class LoginCotroller{
    async index(req: Request, res: Response){
        return res.render('auth/login',{
            layout: '',
            css: ['bootstrap.css',
                'all.min.css'],
            vendors: ['styles/style.css'],
            js: ['jquery.min.js', 
                'bootstrap.js']
        });
    }
    login(req: Request, res: Response,next){
        console.log(req.body);
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req,res,next);
    }
}

export default new LoginCotroller();