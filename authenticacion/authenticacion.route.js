import { Router } from "express";
import { body } from "express-validator";
import validate from "../middlewares/validate.js";
import { Login } from "./authentication.controller.js";

const authenticationRoute = Router()


authenticationRoute.post(
    "/login",
    [
        body("email").exists().isString().isEmail(),
        body("password").exists().isString().isLength({ min: 4 }),
        validate,
    ],
    Login
);


export default authenticationRoute;