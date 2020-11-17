import * as fs from 'fs'
import * as path from 'path'
import 'reflect-metadata'
import {RouteDefinition} from "@models/interfaces/RouteDefinition";

export class ControllersProvider{

    constructor(app: Express.Application) {
        let dirControllers: string = path.join(__dirname, '../http/controllers');

        let filesDirControllers: Array<string> = fs.readdirSync(dirControllers);

        filesDirControllers.forEach(async (i) =>{
            let stat = fs.statSync(dirControllers + '/' + i);
            if (!stat.isDirectory()) {

                let nameClass = path.parse(i).name;

                import("../controllers/" + nameClass).then(controller => {
                    const instance = new controller[nameClass];
                    const prefix = Reflect.getMetadata('prefix', controller[nameClass]);
                    const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller[nameClass]);

                    routes.forEach(route => {
                        app[route.requestMethod](prefix + route.path, (req: Express.Request, res: Express.Response) => {
                            instance[route.methodName](req, res);
                        });
                    });
                });
            }
        });
    }
}