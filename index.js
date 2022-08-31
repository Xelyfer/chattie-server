const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "https://chattie-xelyfer.herokuapp.com",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected`);
  socket.on("join", ({ qRoom }) => {
    socket.join(qRoom);
    console.log(`Joined room: ${qRoom}`);
  });
  socket.on("message", ({ name, message, room }) => {
    console.log(`Sending message: Name: ${name}, Message: ${message}`);
    io.to(room).emit("message", { name, message });
  });
});

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
