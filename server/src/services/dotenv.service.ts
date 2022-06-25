import dotenv from 'dotenv';

export class DotEnvService {
  constructor(private readonly path: string) {}

  initialize() {
    dotenv.config({ path: this.path });
    console.log('ENV Variables initialized!');
  }
}
