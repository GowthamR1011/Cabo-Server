import express from "express";
import { Server } from "socket.io";
import { config } from "dotenv";

config({ path: ".env" });

const app = express();
const expressServer = app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});

const io = new Server(expressServer, {
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
