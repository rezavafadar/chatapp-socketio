import socketIo from "socket.io";
import http from "http";

export class SocketServer {
  private readonly _io: socketIo.Server;

  constructor(server: http.Server) {
    this._io = new socketIo.Server(server);
  }

  listen(): void {
    this._io.on("connection", (socket) => {
      console.log("a user connected");
    });
  }

  close(): void {
    this._io.close((err) => {
      if (err) console.log(err);
      console.log("SocketServer closed!");
    });
  }
}
