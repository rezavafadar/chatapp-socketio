import express from 'express';

import { UserController } from './controllers/user.controller';
import { getRouters } from '../libs/express-routing/index';

export class ApiListener {
  private readonly _app: express.Application;

  constructor() {
    this._app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  initMiddlewares(): void {
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(express.json());
  }

  initRoutes() {
    this._app.use('/api', getRouters([UserController]));
  }

  app(): express.Application {
    return this._app;
  }
}
