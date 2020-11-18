import { RouteDefinition } from '../interfaces/RouteDefinition';

export const HttpRequest = (method: any, path: string, middlewares?: Array<any>): MethodDecorator => {
  return (target, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

    routes.push({
      requestMethod: method,
      path,
      methodName: propertyKey,
      middlewares: middlewares
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};