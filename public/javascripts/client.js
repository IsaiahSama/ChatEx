const socket = io("http://localhost:5000");

socket.emit("handshake", "connecting to server");

socket.on("connect", (...args) => {
  console.log("Connected to server");
});
