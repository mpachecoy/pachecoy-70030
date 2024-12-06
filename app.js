import express from "express";
import args from "./src/utils/args.utils.js";
import dbConnect from "./src/utils/db.utils.js";
import { router as indexRouter } from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import compression from "express-compression";
import winston from "./src/middlewares/winstonLogger.middleware.js";
import cookieParser from "cookie-parser";
import { iniciaPassport } from "./src/cofig/passport.cofig.js";
import passport from "passport";
import { serve, setup } from "swagger-ui-express";
import opts from "./src/utils/swagger.util.js";
import cluster from "cluster";
import { cpus } from "os";
import swaggerJSDoc from "swagger-jsdoc";

const server = express();
const port = args.p;
const mode = args.mode;
const ready = () => {
  console.log(
    `Server ready on port = ${port} on mode ${mode} to PID: ${process.pid}`
  );
  dbConnect();
};

// const isPrimary = cluster.isPrimary;
// if(isPrimary){
//     console.log("Is PRIMARY " + isPrimary);
//     console.log("PROCESS ID: " + process.pid);
//     const numb = cpus().length;
//     for (let i = 1; i<numb; i++){
//         cluster.fork();
//     };
// }else{
//     server.listen(port, ready);
// };

server.listen(port, ready);

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieParser());
server.use(winston);
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

iniciaPassport();
server.use(passport.initialize());

const specs = swaggerJSDoc(opts);
server.use("/api/doc", serve, setup(specs));

server.use("/api", indexRouter);

server.use(errorHandler);
