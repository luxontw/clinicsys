const express = require("express");
const { Socket } = require("socket.io");

const app = express();

const path = require("path");
const docRoot = path.join(__dirname, "public/dist");
console.log(docRoot);
app.use(express.static(docRoot));
app.get('/*', function(req, res) {
  res.sendFile(path.join(docRoot, 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`A user ${socket.id} connected`);
  socket.on("create-member", (data) => {
    console.log(`${socket.id} create`,data);
    socket.broadcast.emit("create-member", data);
})
  socket.on("update-member", (data) => {
    console.log(`${socket.id} update`, data);
    socket.broadcast.emit("update-member", data);
  });
  socket.on("update-oncallMember", (data) => {
    console.log(`${socket.id} update`, data);
    socket.broadcast.emit("update-oncallMember", data);
  });
  socket.on("delete-member", (data) => {
    console.log(`${socket.id} delete`, data);
    socket.broadcast.emit("delete-member", data);
  });
  socket.on("disconnect", () => {
    console.log(`A user ${socket.id} disconnected`);
    socket.broadcast.emit("user-disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
