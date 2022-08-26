const express = require("express");
var socket = require("socket.io");

const app = express();
var server = app.listen(4000, function () {
  console.log("listen this req in port 4000");
});

app.use(express.static("public"));
var io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);
  //handle chat event
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  //handle key press event
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
