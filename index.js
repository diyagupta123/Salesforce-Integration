// import './style.css'
const express = require ('express')
const path=require('path')
const jsforce = require('jsforce')
require('dotenv').config();
// require(dotenv).config()
const app = express()
const PORT =process.env.PORT||5000

const{SF_LOGIN_URL,SF_USERNAME,SF_PASSWORD,SF_TOKEN}=process.env
const conn=new jsforce.Connection({
    loginUrl:SF_LOGIN_URL
})

conn.login(SF_USERNAME,SF_PASSWORD+SF_TOKEN,(err,userInfo)=>{
    if(err){
        console.error(err)
    }
    else{
        console.log("User Id:"+userInfo.id)
        console.log("org Id:"+userInfo.organizationId)
        console.log("connection successfull")
        
    }
})

//first API
app.get('/', (req,res)=>{
   
    res.sendFile(path.join(__dirname,'index.html'))
    // res.send('JSForce Connect Successed!');

    // res.send("Salesforce integration with nodejs")
})
app.get('/account',(req,res)=>{
    conn.query("Select Id, Name From Account",(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            console.log("total records"+ result.totalSize)
            res.json(result.records)
        }
})
})

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
