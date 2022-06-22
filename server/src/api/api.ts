import express, { Request, Response } from "express";

import { userController } from "./controllers/user.controller";
import { getRouters } from "../libs/express-routing/index";

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
    this._app.get("/test", (req: Request, res: Response) => {
      res.status(200).json({ msg: "ok" });
    });

    this._app.use(getRouters([userController]));
  }

  app(): express.Application {
    return this._app;
  }
}
