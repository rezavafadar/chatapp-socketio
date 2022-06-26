import path from 'path';

import { DotEnvService } from './services/dotenv.service';
const dotEnvService = new DotEnvService(path.join(__dirname, 'config', '.env'));
dotEnvService.initialize();

import { AppServer } from './server/server';
import { ApiListener } from './api/api';
import { SocketServer } from './socket/socket';
import { MongooseService } from './services/mongoose.service';
import { EmailConsumers } from './jobs/consumers/email.consumers';
import { MONGO_URI, PORT } from './config';

const apiListener = new ApiListener();
const server = new AppServer(apiListener.app());
const socketServer = new SocketServer(server.server());
const mongooseService = new MongooseService();
const initQueues = new EmailConsumers();

const run = async () => {
  initQueues.initConsumers();

  await mongooseService.connect(MONGO_URI);
  server.listen(PORT);
  socketServer.listen();
};

run();
