const  express= require('express');;
const http = require('http')
const app = express()
const socketIO = require('socket.io');
const server = http.createServer(app);
const io=socketIO(server);


  

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  /*socket.on("send-notification", function () {
    io.emit("new-notification", data);
  });*/

});

module.exports =io;
