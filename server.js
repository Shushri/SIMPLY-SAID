import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

// External API base URL (adjust as needed)
const API_URL = "http://localhost:4000";

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

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

//routes to tech educational page
app.get("/blogs/education", async (req, res) => {
    
    try {
    const response = await axios.get(`${API_URL}/eduposts`);
    console.log(response);
    res.render("blogs/education.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});




// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
