import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import routes from "@routes/routes";
import expressHandle from 'express-handlebars';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import cookie from 'cookie-parser';
import * as passport from 'passport';
import * as auth from '@config/auth';

createConnection().then(async connection => {
    const app = express();

    auth.pp(passport);

    app.use(cookie());
    app.use(session({
        secret: 'dwdjk#n152478D4DSFF4&bd!vy&',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use((req: Request, res: Response, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });
    app.use(express.static(path.join(__dirname, 'static')));

    app.engine('handlebars', expressHandle({
        defaultLayout: 'default',
        extname: '.handlebars',
        helpers: require('./helpers/conditions.js') //only need this}
    }));
    app.set('view engine', 'handlebars');


    app.use(express.json());

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());

    //Not  Found
    app.use((req: Request, res: Response, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    //catch all
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        if (error.status == 404) {
            res.render('errors/404', {
                layout: '',
                style: ['styles/style.css'],
            });
        }
        else if (error.status == 403) {
            res.render('errors/403', {
                layout: '',
                style: ['styles/style.css'],
            });
        }
        else if (error.status == 500) {
            res.render('errors/500', {
                layout: '',
                style: ['styles/style.css'],
            });
        }
    });

    app.use(express.json());

    app.use(routes);

    // routes.use('/user', Routes);

    app.listen(3000);

}).catch(error => console.log(error));
