import * as fs from 'fs'
import * as path from 'path'
import 'reflect-metadata'
import { RouteDefinition } from "@models/interfaces/RouteDefinition";
import { NextFunction } from 'express';
import csurf from 'csurf';

export class ControllersProvider {

    constructor(app: Express.Application) {

        // const csrfMiddleware = csurf({ cookie: true });
        // app['use'](csrfMiddleware);

        let dirControllers: string = path.join(__dirname, '../http/controllers');

        let filesDirControllers: Array<string> = fs.readdirSync(dirControllers);

        filesDirControllers.forEach(async (i) => {
            let stat = fs.statSync(dirControllers + '/' + i);
            if (!stat.isDirectory()) {

                let nameClass = path.parse(i).name;

                import("../http/controllers/" + nameClass).then(controller => {

                    const instance = new controller[nameClass];
                    const prefix = Reflect.getMetadata('prefix', controller[nameClass]);
                    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller[nameClass]);

                    routes.forEach(route => {
                        if (route.middlewares != undefined && route.middlewares.length > 0) {
                            // route.middlewares.push(csrfMiddleware);
                            app[route.requestMethod](prefix + route.path, route.middlewares, (req: Express.Request, res: Express.Response) => {
                                instance[route.methodName](req, res);
                            });
                        } else {
                            app[route.requestMethod](prefix + route.path, (req: Express.Request, res: Express.Response, next: NextFunction) => {
                                instance[route.methodName](req, res, next);
                            });
                        }
                    });
                });
            }
        });
    }
}