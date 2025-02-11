import { Router } from "express";
import { middlewareCustom } from "../middlewares/middlewareCustom.js";
import {
    CreateProducts,
    DeleteProduct,
    GetAllProducts,
    UpdateProduct,
} from "./products-controller.js";

const ProductsRouter = Router();

ProductsRouter.get("/", [middlewareCustom], GetAllProducts);

ProductsRouter.post("/", CreateProducts);


ProductsRouter.patch("/:id", UpdateProduct);

ProductsRouter.delete("/:id", DeleteProduct);

export default ProductsRouter;