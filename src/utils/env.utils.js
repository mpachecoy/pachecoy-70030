import { config } from "dotenv";
import args from "./args.utils.js";

const { mode } = args;
const path = "./.env." + mode;

config({ path });

export default {
    MONGO_URI: process.env.MONGO_URI,
    GOOGLE_ID: process.env.GOOGLE_ID,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET
};