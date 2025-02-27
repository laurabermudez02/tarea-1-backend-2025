import Users from "../users/users-entity.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ data: "Usuario y/o contraseña incorrecto" });
        }

        const isEqual = bcrypt.compareSync(password, user.password);

        if (!isEqual) {
            return res.status(400).json({ data: "Usuario y/o contraseña incorrecto" });
        }

        const userId = user.id;

        const token = jwt.sign({ userId }, process.env.SECRET, {
            expiresIn: "1h",
        });

        return res.status(200).json({ data: { token } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ data: "Algo malo pasó" });
    }
};