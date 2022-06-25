import 'reflect-metadata';
import { Router } from 'express';

import type { Route } from '../interfaces/route.interface';
import { METADATA_KEYS } from '../constants/index';

function getRouter(routes: Route[], constructor: any, path: string) {
  const router = Router();
  const instance: any = new constructor();

  routes.forEach((route) => {
    router[route.method](route.path, route.handler.bind(instance));
  });

  return Router().use(path, router);
}

export function Controller(path: string) {
  return (target: any) => {
    Reflect.defineMetadata(METADATA_KEYS.IS_CONTROLLER, true, target);

    const routes: Route[] =
      Reflect.getMetadata(METADATA_KEYS.ROUTES, target) || [];

    target.prototype.router = getRouter(routes, target, path);
  };
}
