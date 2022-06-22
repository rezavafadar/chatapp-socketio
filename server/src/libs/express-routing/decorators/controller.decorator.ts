import { Router } from "express";
import "reflect-metadata";

import type { Route } from "../interfaces/route.interface";
import { METADATA_KEYS } from "../constants/index";

export function Controller(path: string) {
  return (target: any) => {
    Reflect.defineMetadata(METADATA_KEYS.IS_CONTROLLER, true, target.prototype);

    const classConstructor = target.constructor;
    const routes: Route[] =
      Reflect.getMetadata(METADATA_KEYS.ROUTES, target) || [];

    target.prototype.getRouter = () => {
      const router = Router();

      routes.forEach((route) => {
        router[route.method](route.path, route.handler);
      });

      return Router().use(path, router);
    };
  };
}
