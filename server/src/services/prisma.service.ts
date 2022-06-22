import { PrismaClient } from "@prisma/client";

class PrismaService {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.prismaClient.$connect();
      console.log("Prisma Connection is Successfully!");
    } catch (error) {
      console.log("--- Prisma Connection is UnSccussFully! ---");
      console.log(error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.prismaClient.$disconnect();
      console.log("Prisma Disconnected!");
    } catch (error) {
      console.log("--- Prisma cann't disconnect! ---");
      console.log(error);
    }
  }
}

export const prismaService = new PrismaService();
