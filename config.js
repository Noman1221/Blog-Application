import mongoose from "mongoose";

const dbUrl = 'mongodb://127.0.0.1:27017/AuthBlog';
async function main() {
    await mongoose.connect(dbUrl)
};
main().then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
})

export default main