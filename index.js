import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import usersRouter from "./routers/users-router.js";
import productsRouter from "./products/products-router.js";

const app = express();

app.use(cors());
app.use(morgan());
app.use(bodyParser());

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.listen(8000, () => {
    console.log("App running on port 8000");
});




app.listen(8080,() => {
    console.log("App running on port 8000");
});