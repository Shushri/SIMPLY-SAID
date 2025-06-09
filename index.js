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

app.post("/home",(req,res)=>{
    user=req.body.fName;
    res.render("about.ejs",
        {name:user}
    )
})

app.listen(port,()=>{
    console.log(`Port ${port} is listening now...`);
})