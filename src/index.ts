import dotenv from "dotenv";
import { App } from "./app";
import { UserController } from "./controllers/user-controller";

dotenv.config();
const port = process.env.PORT;
const sessionSecret = process.env.SECRET;
const app = new App([new UserController()], parseInt(port), sessionSecret);

app.listen();
