import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import {Request, Response, NextFunction} from "express";
import routes from "@routes/routes";
import expressHandle from 'express-handlebars';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import session from 'express-session';
import flash from 'express-flash';
import cookie from 'cookie-parser';
import passport from 'passport';
import * as auth from '@config/auth';
import utils from '@utils/conditions';
import errorMiddleware from './middlewares/error'


class Main{
    public app: express.Application;

    constructor() {
        
            this.app = express();        

            this.initializeDatabase();
            this.initializeMiddlewares();
            this.initializeErrorHandling();
            this.initializeCache();
            this.initializePassport();
            this.initializeTemplate();
            this.initializeMessageFlash();
    
            //Path
            this.app.use(express.static(path.join(__dirname, 'static')));
            //Set View
            this.app.set('views', path.join(__dirname, 'static/views'));
            //Routes
            this.app.use(routes);
            
            this.listen();

        
    }

    private initializeDatabase() {
        createConnection().then(() => {
            console.log("Database Connected !!");
        });
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
        this.app.use(cookie());
        this.app.use(session({
            secret: 'dwdjk#n152478D4DSFF4&bd!vy&',
            resave: true,
            saveUninitialized: true,
            cookie: {maxAge: 60000}
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
        this.app.use(flash())
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals.success = req.flash('success');
            res.locals.error = req.flash('error');
            res.locals.warning = req.flash('warning');
            res.locals.user = req.user || null;
            next();
        });
    }

    public listen() {
        this.app.listen(3000, ()=>{
            console.log('Server is running');
        });
    }
}

export default new Main();