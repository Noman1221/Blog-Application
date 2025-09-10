import express from "express";
import multer from "multer";
import { commentOnBlog, createBlog, deleteBlog, getAllComment, readBlog, readIndividualBlog, updateBlog } from "../controllers/blog.controller.js";
import { storage } from "../middlware/cloudConfig.js";
import verifyToken from "../middlware/verifyToken.js";
const upload = multer({ storage })
const blogRouter = express.Router();

blogRouter.post("/create", verifyToken, upload.single("image"), createBlog);
blogRouter.get("/read", verifyToken, readBlog);
// read specific blog 
blogRouter.get("/:id/read", verifyToken, readIndividualBlog);
blogRouter.put("/:id/update", verifyToken, upload.single("image"), updateBlog);
blogRouter.delete("/:id/delete", verifyToken, deleteBlog);

blogRouter.post("/:id/comment", verifyToken, commentOnBlog);
blogRouter.get("/:id/comment", verifyToken, getAllComment);
export default blogRouter;