import express from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";

export class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.corsMiddleWares();
    this.port = port;
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

  private corsMiddleWares() {
    this.app.use(cors());
  }

  // private cors() {
  //   this.app.use(function (req, res, next) {
  //     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  //     next();
  //   });
  // }

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
