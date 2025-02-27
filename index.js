import cors from "cors";
import express from "express";
import morgan from "morgan";
import { Database } from "./database/db.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.js";
import productsRouter from "./products/products-router.js";
import usersRouter from "./users/users-router.js";
import authRouter from "./authenticacion/authenticacion.route.js";

const app = express();

const database = new Database();
database.setup();
app.use(express.json())
app.use(cors());
app.use(morgan());
app.use(rateLimitMiddleware);

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use('/auth', authRouter);


app.listen(8080,() => {
    console.log("App running on port 8080");
});