const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// const server = http.createServer(app);
const server = app.listen("5000", () => {
  console.log("Server Running on Port 5000...");
});

io = socket(server, {
  cors:{
      origin: 'http://localhost:5000/',
      methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
      withCredentials: true
  }
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// server.listen(3001, () => {
//   console.log("SERVER RUNNING");
// });