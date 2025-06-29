import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let blogs = [
  {
    id: 1,
    title: "Tech",
    content: "We are writing this post to make you understand the concepts of routing between client and server.",
    author: "Shrishti",
    date: "2025-06-20T12:15:30.123Z",
  },
  {
    id: 2,
    title: "Personal",
    content: "Hello guys I am Satyam Khare...",
    author: "Satyam",
    date: "2025-06-21T01:20:30.123Z",
  },
  {
    id: 3,
    title: "Creative",
    content: "A bright future lies in our hands...",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",
  },
  {
    id: 4,
    title: "Lifestyle",
    content: "Healthy habits lead to a healthy life...",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",
  },
  {
    id: 5,
    title: "Educational",
    content: "Learning is a lifelong process...",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",
  },
];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Category routes
const getPostsByCategory = (category) => blogs.filter(b => b.title === category);

app.get("/creativeposts", (req, res) => {
  const posts = getPostsByCategory("Creative");
  posts.length ? res.json(posts) : res.status(404).json({ message: "No Creative blogs found" });
});

app.get("/eduposts", (req, res) => {
  const posts = getPostsByCategory("Educational");
  posts.length ? res.json(posts) : res.status(404).json({ message: "No Educational blogs found" });
});

app.get("/techposts", (req, res) => {
  const posts = getPostsByCategory("Tech");
  posts.length ? res.json(posts) : res.status(404).json({ message: "No Tech blogs found" });
});

app.get("/lifeposts", (req, res) => {
  const posts = getPostsByCategory("Lifestyle");
  posts.length ? res.json(posts) : res.status(404).json({ message: "No Lifestyle blogs found" });
});

app.get("/personalposts", (req, res) => {
  const posts = getPostsByCategory("Personal");
  posts.length ? res.json(posts) : res.status(404).json({ message: "No Personal blogs found" });
});

// Get by ID
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogs.find(p => p.id === id);
  post ? res.json(post) : res.sendStatus(404);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = blogs.length ? Math.max(...blogs.map(p => p.id)) + 1 : 1;
  const blog = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toISOString(),
  };
  blogs.push(blog);
  res.status(201).json(blog);
});

// PATCH a post
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogs.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send({ error: "Post not found" });

  blogs[index] = {
    ...blogs[index],
    title: req.body.title || blogs[index].title,
    content: req.body.content || blogs[index].content,
    author: req.body.author || blogs[index].author,
    date: new Date().toISOString(),
  };

  res.json(blogs[index]);
});

// DELETE a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogs.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send({ error: "Can't find the post" });

  blogs.splice(index, 1);
  res.sendStatus(202);
});

// Start server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
