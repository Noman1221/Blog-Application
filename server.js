import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import DataBase from "./config.js";
import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.get("/blog", (req, res) => {
    res.json({ message: "hello baniya group" })
})

app.use("/blog/api", authRouter);
app.use("/blog", blogRouter);
const port = process.env.PORT;
await DataBase();
app.listen(port, () => {
    console.log(`site working on ${port}`);
});