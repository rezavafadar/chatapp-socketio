import { AppServer } from "./server/server";
import { ApiListener } from "./api/api";
import { SocketServer } from "./socket/socket";
import { prismaService } from "./services/prisma.service";
import { redisService } from "./services/redis.service";

const apiListener = new ApiListener();
const server = new AppServer(apiListener.app());
const socketServer = new SocketServer(server.server());

const run = async () => {
  await prismaService.connect();
  await redisService.connect();

  server.listen(3000);
  socketServer.listen();
};

run();
