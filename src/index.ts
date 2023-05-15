import dotenv from "dotenv";
import { App } from "./app";

dotenv.config();
const port = process.env.PORT;
const app = new App([], parseInt(port));

app.listen();
