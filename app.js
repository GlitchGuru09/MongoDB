const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user')

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine",'ejs');

app.get('/', function(req, res){
    res.render('index')
})

//create user
app.post('/create', async function(req, res){
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    });

     res.redirect('/read');
})

//read user
app.get('/read', async function(req, res){
    let users = await  userModel.find()
    res.render('read', {users})
})

app.get('/delete/:id', async function(req, res){
    let users = await  userModel.findOneAndDelete({_id: req.params.id})
    res.redirect("/read")
})

app.listen(port, function(err){
    console.log(`Server is running on port: ${port}`);
})