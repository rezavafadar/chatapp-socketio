import { AppServer } from './server/server';
import { ApiListener } from './api/api';
import { SocketServer } from './socket/socket';
import { DotEnvService } from './services/dotenv.service';
import path from 'path';
import { MongooseService } from './services/mongoose.service';

const apiListener = new ApiListener();
const server = new AppServer(apiListener.app());
const socketServer = new SocketServer(server.server());
const dotEnvService = new DotEnvService(path.join(__dirname, 'config', '.env'));
const mongooseService = new MongooseService();

const run = async () => {
  dotEnvService.initialize();

  await mongooseService.connect(process.env.MONGO_URI);
  server.listen(3000);
  socketServer.listen();
};

run();
