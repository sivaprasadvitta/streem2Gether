import express from "express";
import roomRouter from "./routes/room.route.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import createSocketServer from "./utils/socket.config.js";

const PORT = 3000 || 3001;
const app =  express();
const server = createServer(app);

createSocketServer(server);







app.use('/',roomRouter);

server.listen(PORT,()=>{
    console.log(`server is starts in port- ${PORT}`)
})