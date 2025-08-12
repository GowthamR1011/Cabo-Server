import { Server } from "socket.io";

import express from "express";
import { createServer } from "http";
import { sendWelcomeMessage } from "./messages.socket.js";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.emit("message", sendWelcomeMessage());
  socket.on("message", (data) => {
    console.log(data);
    socket.emit("message", "Response");
  });

  socket.on("disconnect", (data) => {
    console.log(`${socket.id} disconnected`);
  });
});

export { app, server, io };
