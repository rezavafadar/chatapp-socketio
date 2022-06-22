import { Application } from "express";

import { Server, createServer } from "http";

export class AppServer {
  private readonly _server: Server;

  constructor(listener: Application) {
    this._server = createServer(listener);
  }

  close(): void {
    this._server.close((err) => {
      if (err) console.log(err);
      console.log("Server Closed!");
    });
  }

  server(): Server {
    return this._server;
  }

  listen(port: number): void {
    this._server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
