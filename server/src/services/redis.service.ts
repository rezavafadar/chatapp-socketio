import { RedisClientType, createClient } from "redis";

class RedisService {
  private readonly _redisClient: RedisClientType;
  constructor() {
    this._redisClient = createClient();
    this.initEvents();
  }

  private initEvents(): void {
    this._redisClient.on("error", (err) => {
      console.log("--- Redis has an Error ---");
      console.log(err);

      process.exit(1);
    });
  }

  async connect(): Promise<void> {
    try {
      await this._redisClient.connect();
      console.log("Redis Connection is Successfully!");
    } catch (error) {
      console.log("--- Redis Connection is UnSccussFully! ---");
      console.log(error);
    }
  }
}

export const redisService = new RedisService();
