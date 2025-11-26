import express from "express"
import {config} from "dotenv"
import { ConnectToDataBase } from "./config/databaseConnection.js";
import urlRouter from "./routes/url.js"
import healthzRouter from "./routes/healthz.js"
import urlRedirectRouter from "./routes/urlRedirect.js"
import ErrorMiddleware from "./middlewares/Error.js";
import cors from "cors"

// load env for dev enviroment 
config({
    path:".env"
})

const app = express()

const origins = process.env.FRONTEND_URL || "http://localhost:3000"

 // using middle ware to pasre json and body req   
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors({
    origin: origins, // your React frontend
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));

const Port = process.env.PORT || 5000
const ConnectionStringURL = process.env.DATABASE_CONNECTION_STRING ||"mongodb://admin:admin@mongo:27017/abhishek?authSource=admin"

// make connection with db
// i don't want to explicitly load env files into '/config/databaseConnection.js that's why connection str send as arg.
ConnectToDataBase(ConnectionStringURL);


app.use("/",urlRedirectRouter)
app.use("/get",healthzRouter)
app.use("/api",urlRouter)

// expose app port 
app.listen(Port,()=>{
    console.log("listen application at port:",Port)
})

app.use(ErrorMiddleware);