import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import Users from "../users/users-entity.js";

configDotenv();
export const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);

        const token = authorization.split(" ")[1];

        const { userId } = jwt.verify(token, process.env.SECRET);

        const user = await Users.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ data: "El usuario ya no existe" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ data: "No se encuentra autorizado" });
    }
};