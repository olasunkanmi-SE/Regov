import dotenv from "dotenv";
import { App } from "./app";

dotenv.config();
const port = process.env.PORT;
const sessionSecret = process.env.SECRET;
const app = new App([], parseInt(port), sessionSecret);

app.listen();
