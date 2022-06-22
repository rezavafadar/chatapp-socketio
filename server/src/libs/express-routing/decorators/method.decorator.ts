import "reflect-metadata";

import { MethodsEnum } from "../enums/methods.enum";
import { METADATA_KEYS } from "../constants/index";
import { Route } from "../interfaces/route.interface";

function MethodFactory(method: MethodsEnum) {
  return (path: string) => {
    return (target: Object, key: string) => {
      const classConstructor = target.constructor;
      const routes: Route[] =
        Reflect.getMetadata(METADATA_KEYS.ROUTES, classConstructor) || [];

      routes.push({
        path,
        method,
        handler: target[key],
      });

      Reflect.defineMetadata(METADATA_KEYS.ROUTES, routes, classConstructor);
    };
  };
}

export const GET = MethodFactory(MethodsEnum.GET);
export const POST = MethodFactory(MethodsEnum.POST);
export const DELETE = MethodFactory(MethodsEnum.DELETE);
export const PUT = MethodFactory(MethodsEnum.PUT);
