const express = require("express");
const app = express();
const path = require("path");
const usersRouter = require("./routes/userRoutes.js");
const logger = require("./util/logger.js");
const http = require("http");
const server = http.createServer(app);
const public = path.join(__dirname, "./public");
const io = require("./util/io.js").init(server);
const event = require("./util/event.js").init();
app.use(express.static(public));
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });
});

server.listen(3000);
console.log("running on port 3000");
logger.info("running on port 3000");

process.on("SIGINT", function () {
  logger.info("\nGracefully shutting down from SIGINT (Ctrl-C)");
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit();
});

module.exports = app;
