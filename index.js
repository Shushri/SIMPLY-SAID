//API here
import express from "express"
import bodyParser from "body-parser";

const app=express();
const port=4000;


let blogs=[
  {
    id: 1,
    content: "We are writing this post to make you understand the concepts of routing between client and server.",
    title: "Tech",
    author: "Shrishti",
    date: "2025-06-20T12:15:30.123Z",

  },
  {
    id: 2,
    content: "Hello guys I am Satyam Khare. I am a student in IIIT Bhopal. I am in IT branch. I love DSA and Coding",
    title: "Personal",
    author: "Satyam",
    date: "2025-06-21T01:20:30.123Z",

  },
  {
    id: 3,
    content: "A bright future lies in our hands and that is only possible when we gather for saving our environment.",
    title: "Creative",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",

  },
  {
    id: 3,
    content: "A bright future lies in our hands and that is only possible when we gather for saving our environment.",
    title: "Lifestyle",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",

  },
  {
    id: 4,
    content: "A bright future lies in our hands and that is only possible when we gather for saving our environment.",
    title: "Educational",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",

  },
  
]

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get the tech blogs
app.get("/creativeposts", (req, res) => {
  const creblogs = blogs.filter(b => b.title === "Creative");

  if (creblogs.length > 0) {
    res.json(creblogs);
  } else {
    res.status(404).json({ message: "No Creative blogs found" });
  }
});


//get the edu blogs
app.get("/eduposts", (req, res) => {
  const edublogs = blogs.filter(b => b.title === "Educational");

  if (edublogs.length > 0) {
    res.json(edublogs);
  } else {
    res.status(404).json({ message: "No Educational blogs found" });
  }
});

//get the edu blogs
app.get("/techposts", (req, res) => {
  const techblogs = blogs.filter(b => b.title === "Tech");

  if (techblogs.length > 0) {
    res.json(techblogs);
  } else {
    res.status(404).json({ message: "No Technology blogs found" });
  }
});

//get the lifestyle blogs
app.get("/lifeposts",(req,res)=>{
  const lifeblogs=blogs.filter(b => b.title === "Lifestyle");
  if(lifeblogs.length>0){
    res.json(lifeblogs);
  }
  else{
    res.status(404).json({ message: "No Lifestyle blogs found" });
  }
})

//get the personal blogs
app.get("/personalposts",(req,res)=>{
  const personalblogs=blogs.filter(b => b.title === "Personal");
  if(personalblogs.length>0){
    res.json(personalblogs);
  }
  else{
    res.status(404).json({ message: "No Personal blogs found" });
  }
})

//get the post by id
app.get("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const post=posts.find(p=>p.id===id);
  if(post){
    res.json(post);
  }
  else{
    res.sendStatus(404);
  }

  //POST a new post
  app.post("/posts",(req,res)=>{
    const blog={
      id: blogs.length+1,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),

    }
    blogs.push(blog);
    res.json(blog);
});

//Patch a blog
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = blogs.findIndex(p => p.id === id);

  if (index === -1) {
    res.status(404).send({ error: "Post not found" });
  }

  
  blogs[index] = {
    id: id,
    title: req.body.title || blogs[index].title,
    content: req.body.content || blogs[index].content,
    author: req.body.author || blogs[index].author,
    date: new Date(), 
  };

  res.json(blogs[index]);
});


});

//delete a post
app.delete("/posts/:id",(req,res)=>{
  const id = parseInt(req.params.id);
  const index = blogs.findIndex(p => p.id === id);
  if(index===-1){
    return res.status(404).send({error:"Can't find ther post"});
  }
  blogs.splice(index,1);
  res.send(202);
});




app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});


