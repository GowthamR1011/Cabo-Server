import express from "express";
import { Server } from "socket.io";
import { config } from "dotenv";
import { createServer } from "http";

config({ path: ".env" });

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("message", (data) => {
    console.log(data);
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});
