import { Router } from "express";
import { middlewareCustom } from "../middlewares/middlewareCustom.js";
import {
    CreateProducts,
    DeleteProduct,
    GetAllProducts,
    UpdateProduct,
} from "./products-controller.js";
import { body } from "express-validator";
import validate from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.js";

const ProductsRouter = Router();

ProductsRouter.get("/", [authMiddleware], GetAllProducts);

ProductsRouter.post("/", [
    authMiddleware,
    body("name").isString().withMessage("El nombre del producto es requerido"),
    validate,
], CreateProducts);

ProductsRouter.patch("/:id", [authMiddleware], UpdateProduct);

ProductsRouter.delete("/:id", [authMiddleware], DeleteProduct);

export default ProductsRouter;