import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Database } from "./database/db.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.js";
import productsRouter from "./products/products-router.js";
import usersRouter from "./users/users-router.js";
import authRouter from "./authenticacion/authenticacion.route.js";
import {createServer} from 'http';
import { setupSocket } from "./utills/socket.js";


const app = express();
const httpServer = createServer(app);

const database = new Database();
database.setup();
app.use(express.json())
app.use(cors());
//app.use(morgan());

app.use("/users",rateLimitMiddleware, usersRouter);
app.use("/products",rateLimitMiddleware, productsRouter);
app.use('/auth',rateLimitMiddleware, authRouter);

setupSocket(httpServer);

httpServer.listen(8080, () => {
    console.log("App running on port 8080");
});
