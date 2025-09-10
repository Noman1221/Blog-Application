import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
export const register = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username && !password) {
            return res.status(400).json({ message: "Missing username or password" })
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: "hashing faild" })
        };

        const addUser = new User({
            username,
            password: hashedPassword,
        });
        await addUser.save()

        const token = await jwt.sign({ userId: addUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1 * 60 * 60 * 1000,
        });

        res.status(201).json({ message: "user register successfully", user: addUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
};


export const login = async (req, res) => {
    try {
        let { username, password } = req.body;
        if (!username && !password) {
            return res.status(400).json({ message: "Missing username or password" })
        };
        const isUser = await User.findOne({ username: username });
        if (!isUser) return res.status(400).json({ message: "user not found" });
        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isMatch) return res.status(400).json({ message: "credentials invalid" });
        const token = jwt.sign({ userId: isUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // or false for localhost
            sameSite: "Strict",
            maxAge: 1 * 60 * 60 * 1000 // 1 hour
        });
        res.status(200).json({ message: "user login successfully", token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}