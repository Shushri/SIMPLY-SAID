import express from "express"
import bodyParser from "body-parser";
import axios from "axios";

const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

var user="";
app.get("/",(req,res)=>{
    try {
      res.render("index.ejs");  
    } catch (error) {
      console.log("NOT FOUND");
    }
    
})

app.get("/blogs/:category", async(req, res) => {
  const category = req.params.category;
  var number=Math.floor(Math.random()*1000);
  const validCategories = ["tech", "lifestyle", "education", "personal", "creative"];
  try {
    const result=await axios.get(`http://numbersapi.com/${number}`)
    if (validCategories.includes(category)) {
    res.render(`blogs/${category}.ejs`, { category: category , facts:result.data });
  } else {
    res.status(404).send("Category not found");
  }  
  } 
  catch (error) {
    if (validCategories.includes(category)) {
    res.render(`blogs/${category}.ejs`, { category: category , facts:"waiting..." });
  } else {
    res.status(404).send("Category not found");
  } 
  }
  
  
});



app.post("/home",(req,res)=>{
    user=req.body.fName;
    res.render("about.ejs",
        {name:user}
    )
})



app.listen(port,()=>{
    console.log(`Port ${port} is listening now...`);
})