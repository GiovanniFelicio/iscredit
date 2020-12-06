import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Controller } from "@decorators/Controller";
import { HttpRequest } from "@decorators/HttpRequest";

@Controller('/auth')
export class LoginController {

    @HttpRequest('get', '/login')
    async index(req: Request, res: Response) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        let toda = mm + '/' + dd + '/' + yyyy;
        console.log(toda)
        return res.render('auth/login', {
            layout: '',
            css: ['bootstrap.css', 'all.min.css'],
            vendors: ['styles/style.css'],
            js: ['jquery.min.js', 'bootstrap.js']
        });
    }

    @HttpRequest('post', '/login')
    login(req: Request, res: Response, next: NextFunction) {

        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true,
            successFlash: true,
        })(req, res, next);
    }
}