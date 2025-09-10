import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next()
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
export default verifyToken;