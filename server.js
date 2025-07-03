import express from "express";
import bodyParser from "body-parser";
import axios from "axios";   //trying to build an api

const app = express();
const port = 3000;

// External API base URL (adjust as needed)
const API_URL = "http://localhost:4000";

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



let user = "";

// Login page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Home page after login
app.post("/home", (req, res) => {
  user = req.body.fName;
  res.render("about.ejs", { name: user });
});

// Blogs by category (static categories)

//routes to creative blogs page
app.get("/blogs/creative", async (req, res) => {
    
    try {
    const response = await axios.get(`${API_URL}/creativeposts`);
    console.log(response);
    res.render("blogs/creative.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//routes to tech blogs page
app.get("/blogs/tech", async (req, res) => {
    
    try {
    const response = await axios.get(`${API_URL}/techposts`);
    console.log(response);
    res.render("blogs/tech.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//routes to  educational page
app.get("/blogs/education", async (req, res) => {
    
    try {
    const response = await axios.get(`${API_URL}/eduposts`);
    console.log(response);
    res.render("blogs/education.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//route to Lifestyle blogs page
app.get("/blogs/lifestyle",async(req,res)=>{
  try {
    const response=await axios.get(`${API_URL}/lifeposts`);
    res.render("blogs/lifestyle.ejs",{ posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
})

//route to Personal blogs page
app.get("/blogs/personal",async(req,res)=>{
  try {
    const response=await axios.get(`${API_URL}/personalposts`);
    res.render("blogs/personal.ejs",{ posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
})

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    //console.log(response.data);
    res.render("modify.ejs", {
      
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

// Create a new post
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    console.log(response.data);
    const title = response.data.title;
    res.redirect(`/blogs/${title.toLowerCase()}`);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});
// Partially update a post
app.post("/api/posts/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    const title = response.data.title;
    res.redirect(`/blogs/${title.toLowerCase()}`);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    const { title } = response.data;

    // Now delete the post
    await axios.delete(`${API_URL}/posts/${req.params.id}`);

    // Redirect using the post's title
    res.redirect(`/blogs/${title.toLowerCase()}`);
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
