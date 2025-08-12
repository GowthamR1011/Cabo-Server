import { config } from "dotenv";

config({ path: ".env" });

import { app, server } from "./socket/socket.js";

server.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
  console.log(`Running in ${process.env.NODE_ENV} mode`);
});
