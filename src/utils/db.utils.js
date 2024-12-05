import { connect } from "mongoose";
import env from "./env.utils.js"

async function dbConnect() {
    try {
        await connect(env.MONGO_URI)
        console.log("dB connected to PID" + process.pid);        
    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;