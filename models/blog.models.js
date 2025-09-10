import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    comment: [
        {
            text: String,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            timeStamp: { type: Date, default: Date.now },
        }
    ]

}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog