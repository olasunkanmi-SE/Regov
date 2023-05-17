import express from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";
import session from "express-session";
export class App {
  public app: express.Application;
  public port: number;
  public sessionSecret: string;

  constructor(controllers: unknown, port: number, sessionSecret: string) {
    this.app = express();
    this.port = port;
    this.sessionSecret = sessionSecret;
    this.connectDB();
    this.initMiddleWares();
    this.initControllers(controllers);
    this.intializeErrorHandling();
  }

  private connectDB() {
    const options = {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };
    mongoose
      .connect(process.env.DBURL, options)
      .then(() => console.log("MongoDB connected successfully"))
      .catch((err) => console.log(err));
  }

  private initMiddleWares() {
    this.app.use(bodyParser.json());
  }

  private intializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initControllers(controllers: any) {
    for (const controller of controllers) {
      this.app.use("/", controller.router);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server s running on https://localhost:${this.port}`);
    });
  }
}
