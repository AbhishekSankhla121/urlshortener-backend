import express from "express"
import {config} from "dotenv"
import { ConnectToDataBase } from "./config/databaseConnection.js";

// load env for dev enviroment 
config({
    path:".env"
})

const app = express()
const Port = process.env.PORT || 5000
 const ConnectionStringURL = process.env.DATABASE_CONNECTION_STRING ||"mongodb://admin:admin@mongo:27017/abhishek?authSource=admin"

 // using middle ware to pasre json and body req
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

ConnectToDataBase(ConnectionStringURL);


app.get("/",(req,res,next)=>{
    res.send("working")
})

// expose app port 
app.listen(Port,()=>{
    console.log("listen application at port:",Port)
})