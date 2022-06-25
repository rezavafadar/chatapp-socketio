import mongoose from 'mongoose';

export class MongooseService {
  private mongo_uri: string;
  constructor(private readonly connectionOptions?: mongoose.ConnectOptions) {}

  async connect(connectionUri: string) {
    try {
      await mongoose.connect(connectionUri, this.connectionOptions);
      this.mongo_uri = connectionUri;
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.log('Connect to MongoDB is unsuccessful!');
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('MongoDB Connection Disconnected!');
    } catch (error) {
      console.log('MongoDB Disconnection failed!');
    }
  }
}
