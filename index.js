const express=require("express")
const app=express()
const port=8080;
const path=require("path")

const chat=require("./models/chat.js")



app.set("view engine","ejs")
app.set("views",path.join(__dirname,("views")))
app.use(express.static(path.join(__dirname,"/public")))

app.use(express.urlencoded({extended:true}))

//from mongoose web quick start documentation......
// note bina db me use kiye bina mongosh  ke start kiye hi connection succesful ho gya bcoz whatsapp name ka db bnn gya hai by main method...
const mongoose = require('mongoose');

main()
.then((res)=>{
    console.log("connection successful!..")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



// let chat1=new chat({
//     from:"neha",
//     to:"priya",
//     msg:"pls send your exam shortnotes",
//     created_at:new Date(),

// })

// chat1.save()
// .then((res)=>{console.log(res)})
// .catch((err)=>{console.log(err)})



app.listen(port,(req,res)=>{
    console.log(`server is working on port ${port}`)
})


app.get("/chats",async (req,res)=>{
    let chats=await chat.find()// await keyword bcoz ye promise return krega and ye asychronous func hai thats why fun co async krna pdega for using await keyword...
    console.log(chats)
    res.render("index.ejs",{chats})
})  


app.get("/chats/new",(req,res)=>{
    res.render("new.ejs")
})

app.post("/chats",(req,res)=>{
     let {from,to,msg}=req.body

    //inserting in db 
     let newChat=new chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
     })
     newChat.save().then((res)=>{console.log("chat was saved")})
     .catch((err)=>{console.log(err)})
     res.redirect("/chats")
})

app.get("/chat/:id/edit", async (req,res)=>{
    let {id}=req.params
     let chat= await chat.findById(id) // find by id ashycronoues and if we dint use then method  so we will use await
    //  let newChat=chat.findByIdAndUpdate()
    res.render("edit.ejs",{chat})

})


//NOTE: data permanently store ho jayega.bcoz db me ja rha hai....
//NOTE: jha uper save asynchrounous hai but jha hm generally hm  then use krte hain wha await use nhui krte bcoz js ko already pta hai...
//but ager use bhi kr rhe to koi error nhi aayega...
app.get("/",(req,res)=>{
    res.send("req is working.................")
})