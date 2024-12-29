const express = require('express');
const app = express();
const userModel = require('./usermodel');

const port = 3000;


app.get('/', function(req, res){
    res.send("hey");
})

//crud
//create
app.get('/create', async function(req, res){
    let createdUser =  await userModel.create({
        name: "shrey",
        username: "shrey09",
        email: "shreyvernekar09@gmail.com"
    })

    res.send(createdUser)
})

//read
app.get('/read', async function(req, res){
    let users = await userModel.find() //find({name: "shrey vernekar"}) //find() to get all users
    res.send(users)
})

//update
app.get('/update', async function(req, res){
    let updatedUser = await  userModel.findOneAndUpdate({username: "shrey09"}, {name: "shrey vernekar"}, {new: true})
    //findOneUpdate(findOne, newValue, {new:true})
    res.send(updatedUser)
})


//delete
app.get('/delete', async function(req, res){
    let deleteUser = await userModel.findOneAndDelete({name: "shrey"}) 
    res.send(deleteUser)
})


app.listen(port, function(err){
    console.log(`server running on port ${port}`);
})

