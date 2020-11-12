import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import {Request, Response, NextFunction} from "express";
import routes from "@routes/routes";
import expressHandle from 'express-handlebars';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import session from 'express-session';
import flash from 'connect-flash';
import cookie from 'cookie-parser';
import * as passport from 'passport';
import * as auth from '@config/auth';
import utils from '@utils/conditions';
import errorMiddleware from './middlewares/error'


class Main{
    public app: express.Application;

    constructor() {
        createConnection().then(async connection => {

            this.app = express();        
    
            this.initializeMiddlewares();
            this.initializeErrorHandling();
            this.initializeCache();
            this.initializePassport();
            this.initializeTemplate();
            this.initializeMessageFlash();
    
            //Path
            this.app.use(express.static(path.join(__dirname, 'static')));
            //Routes
            this.app.use(routes);                

        }).catch(error => console.log(error));
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended: true}))
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializePassport() {
        auth.pp(passport);

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private initializeCache() {
        // this.app.use(cookie());
        this.app.use(session({
            secret: 'dwdjk#n152478D4DSFF4&bd!vy&',
            resave: true,
            saveUninitialized: true
        }));
    }

    private initializeTemplate() {
        this.app.engine('handlebars', expressHandle({
            defaultLayout: 'default',
            extname: '.handlebars',
            helpers: utils
        }));
        this.app.set('view engine', 'handlebars');
    }

    private initializeMessageFlash() {
        this.app.use(flash());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next();
        });
    }

    public listen() {
        this.app.listen(3000);
    }
}

new Main();

// app.use((req: Request, res: Response, next: NextFunction) => {
//     let error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// //catch all
// app.use((error, req: Request, res: Response, next: NextFunction) => {
//     res.status(error.status || 500);
//     if (error.status == 404) {
//         res.render('errors/404', {
//             layout: '',
//             style: ['styles/style.css'],
//         });
//     }
//     else if (error.status == 403) {
//         res.render('errors/403', {
//             layout: '',
//             style: ['styles/style.css'],
//         });
//     }
//     else if (error.status == 500) {
//         res.render('errors/500', {
//             layout: '',
//             style: ['styles/style.css'],
//         });
//     }
// });