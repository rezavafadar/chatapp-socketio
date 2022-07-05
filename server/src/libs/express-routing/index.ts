import { Router } from 'express';
import { Controller } from './decorators/controller.decorator';
import { DELETE, GET, POST, PUT } from './decorators/method.decorator';

export { Controller, DELETE, GET, POST, PUT };

export function getRouters(controllers: any[]) {
  const router = Router();

  for (const controller of controllers) {
    const controllerInstace = new controller();
    router.use(controllerInstace.router);
  }

  return router;
}
