import { Handler } from "express";

import { MethodsEnum } from "../enums/methods.enum";

export interface Route {
  path: string;
  method: MethodsEnum;
  handler: Handler;
}
