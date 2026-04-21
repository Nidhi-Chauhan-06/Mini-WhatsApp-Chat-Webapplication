const mongoose = require('mongoose');
const chat=require("./models/chat.js")


main()
.then((res)=>{
    console.log("connection successful!..")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let allchats=[
    {
    from:"neha",
    to:"tony",
    msg:"pls sing a song",
    created_at:new Date(),
    },
    {
    from:"riya",
    to:"priya",
    msg:"hey whatsup!",
    created_at:new Date(),
    },
    {
    from:"khushi",
    to:"shalini",
    msg:"pls write my assignment",
    created_at:new Date(),
    },
    
]

//model.insertMany([{}])

chat.insertMany(allchats);

//node init.js run to save data in db

// kbhi bhi data insert krna ho issi file se daall skte hai but ab iska kaam ho gya so not run this 