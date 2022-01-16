import { Server } from "socket.io";
import { app } from "./app";
import * as http from "http";

const httpServer = new http.Server(app);
const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('a user connected');
});

export { httpServer };