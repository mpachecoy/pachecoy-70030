import express from "express";
import args from "./src/utils/args.utils.js";
import dbConnect from "./src/utils/db.utils.js";
import { router as usersRouter } from "./src/routers/users.router.js";
import { router as productRouter} from "./src/routers/prodcuts.router.js";
import { router as sessionsRouter } from "./src/routers/session.router.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import compression from "express-compression";
import winston from "./src/middlewares/winstonLogger.middleware.js";
import cookieParser from "cookie-parser";
import { iniciaPassport } from "./src/cofig/passport.cofig.js";
import passport from "passport";


const server = express();
const port = args.p;
const mode = args.mode;
const ready = () => {
    console.log(`Server ready on port = ${port} on mode ${mode}`);
    dbConnect();
};
server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(winston);
server.use(compression({
    brotli: { enabled: true, zlib:{} }
}));

iniciaPassport();
server.use(passport.initialize());

server.use("/api/sessions", sessionsRouter);
server.use("/api/users", usersRouter);
server.use("/api/products", productRouter);

server.use(errorHandler);