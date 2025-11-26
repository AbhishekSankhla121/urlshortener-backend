import mongoose from "mongoose" 
import {config} from "dotenv"

config({
    path:".env"
})

async function ConnectToDataBase (ConnectionStringURL){
    try {
       
        await mongoose.connect(ConnectionStringURL);
        console.log("Connected to MongoDB successfully:", ConnectionStringURL);
    } catch (error) {
        console.error("Error: Connection to MongoDB failed\n", error);
    }
}

export {ConnectToDataBase}