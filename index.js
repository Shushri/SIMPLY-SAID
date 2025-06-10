import express from "express"
import bodyParser from "body-parser";
import { name } from "ejs";
const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

var user="";
app.get("/",(req,res)=>{
    
    res.render("index.ejs"
    );
})

app.get("/blogs/:category", (req, res) => {
  const category = req.params.category;

  const validCategories = ["tech", "lifestyle", "education", "personal", "creative"];
  
  if (validCategories.includes(category)) {
    res.render(`blogs/${category}.ejs`, { category: category });
  } else {
    res.status(404).send("Category not found");
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