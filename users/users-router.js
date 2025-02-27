import { Router } from "express";
import { body, param } from "express-validator";
import validate from "../middlewares/validate.js";
import { GetAllUsers, CreateUsers, UpdateUser, DeleteUser } from './users-controller.js';
import { authMiddleware } from "../middlewares/auth.js";

const usersRouter = Router();

usersRouter.get("/",
    [
        authMiddleware
    ],
    GetAllUsers);

usersRouter.post(
    "/",
    [
        authMiddleware,
        body("name").exists().isString(),
        body("email").exists().isString().isEmail(),
        body("password").exists().isString().isLength({ min: 4 }),
        validate,
    ],
    CreateUsers
);
//  [Patch] localhost:8000/users/2
usersRouter.patch(
    "/:id",
    [
        authMiddleware,
        body("name").optional().isString().isAlphanumeric(),
        body("email").optional().isString().isEmail(),
        body("password").optional().isString().isLength({ min: 4 }),
        validate,
    ],
    UpdateUser
);
//  [DELETE] localhost:8000/users/2
usersRouter.delete(
    "/:id",
    [
        authMiddleware,
        param("id").exists().isNumeric(), validate],
    DeleteUser
);

export default usersRouter;