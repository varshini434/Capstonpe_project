const { request } = require("express");
const express = require("express");
const app = express();
const request1 = require('request')

const {initializeApp , cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");   
                   
initializeApp({
    credential: cert(serviceAccount)
})
const db = getFirestore(); 

app.set('view engine','ejs');


app.get("/",(req,res)=>{
    res.render('home')
});

app.get("/tabs",(req,res)=>{
    res.render('tabs')
 });

app.get("/signup",(req,res)=>{
    res.render('signup')
});

app.get("/signupsubmit",(req,res)=>{
   
   const firstname = req.query.fname;
   const lastname = req.query.lname;
   const email = req.query.email;
   const phone = req.query.phone;
   const password = req.query.pwd;

    db.collection('users').add({
        name : firstname + " "+lastname,
        email : email,
        password : password,
    }).then(() =>{
        res.send("registration successful")
    })
});

 app.get("/signin",(req,res)=>{
    res.render('signin')
 });

 app.get("/signinsubmit",(req,res)=>{
    const email = req.query.email;
    const password = req.query.pwd;

    db.collection('users')
    .where("email","==",email)
    .where("password","==",password)
    .get()
    .then((docs) =>{
        if(docs.size >0){
            res.render("tabs")
        }
        else{
            res.render('signup')
        }
    })

 });


app.listen(6652, function(){
    console.log("App is Running on port 6652")
})
