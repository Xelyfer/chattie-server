const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} has connected`);
  socket.on("message", ({ name, message }) => {
    console.log(`Sending message: Name: ${name}, Message: ${message}`);
    io.emit("message", { name, message });
  });
});

const port = process.env.port || 5000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
