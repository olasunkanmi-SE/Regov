import dotenv from "dotenv";
import { App } from "./app";
import { UserController } from "./controllers/user-controller";
import { EventController } from "./controllers/event-controller";
import { ReviewController } from "./controllers/review-controller";

dotenv.config();
const port = process.env.PORT;
const app = new App([new UserController(), new EventController(), new ReviewController()], parseInt(port));

app.listen();
