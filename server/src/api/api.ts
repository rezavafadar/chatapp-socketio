import express from 'express';
import expressSession from 'express-session';

import { AuthController } from '../modules/auth/auth.controller';
import { getRouters } from '../libs/express-routing/index';
import { ExceptionHandlerMiddleware } from '../middlewares/exception.middleware';

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
    this._app.use(
      expressSession({
        cookie: {
          httpOnly: true,
        },
        secret: 'Test',
        saveUninitialized: false,
        resave: false,
      }),
    );
  }

  initRoutes() {
    this._app.use('/api', getRouters([AuthController]));
    this._app.use(ExceptionHandlerMiddleware.globalErrorHandler);
  }

  app(): express.Application {
    return this._app;
  }
}
