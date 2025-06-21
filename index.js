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
    title: "Environment",
    author: "Bhoomija",
    date: "2025-06-18T01:30:40.123Z",

  }
  
]

// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});


