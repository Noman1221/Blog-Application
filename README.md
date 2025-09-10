 Blog API 

 🚀 Features

- **Authentication & Authorization**
  - Secure registration and login with **JWT**
  - Protected routes for blog creation, updates, and deletion

- **Blog Management**
  - Full **CRUD**: Create, Read, Update, Delete
  - File/image uploads using **Multer**

- **Comments**
  - Add comments to blogs
  - Retrieve comments for each blog

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Authentication**: JSON Web Token (JWT)  
- **File Handling**: Multer  

---

## 📂 Project Structure  





---

## 🔑 API Endpoints

### Auth
- `POST http://localhost:3000/blog/api/login` → User login  

### Blogs
- `POST http://localhost:3000/blog/create` → Create a new blog (protected)  
- `GET http://localhost:3000/blog/read` → Get all blogs  
- `PUT http://localhost:3000/blog/68933a691319078b45c44ee2/update` → Update a blog by ID (protected)  
- `DELETE http://localhost:3000/blog/68933a691319078b45c44ee2/update` → Delete a blog by ID (protected)  

### Comments
- `POST http://localhost:3000/blog/68933a691319078b45c44ee2/comment` → Add a comment on a blog  
- `GET http://localhost:3000/blog/68933a691319078b45c44ee2/comment` → Get comments of a blog  

---

## ⚙️ Installation & Setup

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api






Future Improvements

Like/Dislike functionality for blogs

User profiles with authored blogs & comments

Blog categories and tags

Pagination and search   





👨‍💻 Author

Built by Noman khan 🚀
