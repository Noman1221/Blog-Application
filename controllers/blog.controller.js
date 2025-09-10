import Blog from "../models/blog.models.js";



export const createBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;

        if (!title || !description) {
            return res.status(400).json({ message: "Missing details" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image upload failed" });
        }

        const imageUrl = req.file.path || req.file.secure_url || req.file.url || null;

        console.log("Image URL from Cloudinary:", imageUrl);

        const newBlog = new Blog({
            user: userId,
            title,
            description,
            image: imageUrl,
        })

        await newBlog.save();
        res.status(201).json({ message: "Blog created", blog: newBlog });

    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).json({ message: error.message });
    }
};

export const readBlog = async (req, res) => {
    try {
        let page = parseInt(req.query.page) | 1;
        let limit = parseInt(req.query.limit) | 2;
        let skip = (page - 1) * limit;

        const blogs = await Blog.find({}).populate("user").skip(skip).limit(limit).sort({ createdAt: -1 });
        const totalBlogs = await Blog.countDocuments();
        if (!blogs || blogs.length === 0) return res.status(400).json({ message: "blogs not avalibale" });
        res.status(200).json({
            message: "get all blogs", blog: blogs, currentPage: page, totalPages: Math.ceil(totalBlogs / limit), totalBlogs,

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const updateBlog = async (req, res) => {
    try {
        let { title, description } = req.body;
        let { id } = req.params;
        let userId = req.user.userId;

        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(400).json({ message: "blog does not exist" })
        }
        if (blog.user.toString() !== userId) {
            return res.status(403).json({ message: "forbidden" })
        };
        if (!req.file) {
            return res.status(400).json({ message: "image file is required" })
        };
        let imageUrl = req.file.path || req.file.secure_url || req.file.url || null;

        let upBlog = await Blog.findByIdAndUpdate(id, { title, description, image: imageUrl }, { new: true });
        console.log(upBlog);

        res.status(200).json({ message: "updated Blog", blog: upBlog })
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
}


export const deleteBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let userId = req.user.userId;
        let blog = await Blog.findById(id);
        if (blog.user.toString() !== userId) {
            return res.status(403).json({ message: "forbidden" })
        }
        let deleteBlog = await Blog.findOneAndDelete(id);
        if (!deleteBlog) {
            return res.status(400).json({ message: "not found" })
        }
        console.log(deleteBlog);
        res.status(200).json({ message: "deleted successfully" })
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
}


export const commentOnBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let userId = req.user.userId;
        let { text } = req.body;
        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(400).json({ message: "blog not found" });
        };
        blog.comment.push({ text: text, userId: userId });
        await blog.save();
        res.status(200).json({ message: "comment successfully" });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message })
    }
}


export const getAllComment = async (req, res) => {
    try {
        let { id } = req.params;

        // Step 1: Find blog and populate comment.userId
        let blog = await Blog.findById(id).populate("comment.userId", "-password -__v");

        // Step 2: Handle blog not found
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Step 3: Filter non-empty comments (optional — you can skip if all comments are valid)
        const comments = blog.comment.filter(c => c && c.text);

        // Step 4: Return response
        if (comments.length === 0) {
            return res.status(404).json({ message: "No comments available" });
        }

        res.status(200).json({
            message: "Fetched all comments with owner details",
            comments
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


export const readIndividualBlog = async (req, res) => {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({ message: "blog does'nt exist" });
    };
    res.status(200).json({ message: "get blog details", blog });
}
