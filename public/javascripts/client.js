const socket = io("http://localhost:5000");

socket.emit("handshake", "connecting to server");

socket.on("connect", (...args) => {
  console.log("Connected to server");
});

document.getElementById("sendMessage").onclick = () => {
  const messageField = document.getElementById("cMessage");
  const data = messageField.value;

  // clearing the message field
  messageField.value = "";

  socket.emit("message", data);
};
