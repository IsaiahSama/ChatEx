const socket = io("http://localhost:5000");

const messagesDiv = document.getElementById("messagesDiv");

socket.emit("handshake", "connecting to server");

socket.on("connect", (...args) => {
  console.log("Connected to server");
});

socket.on("message", (message) => {
  const messageDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const contentDiv = document.createElement("div");

  messageDiv.className = "message";
  nameDiv.className = "sender";
  contentDiv.className = "messageContent";

  nameDiv.innerText = "Client";
  contentDiv.innerText = message;

  messageDiv.appendChild(nameDiv);
  messageDiv.appendChild(contentDiv);

  messagesDiv.appendChild(messageDiv);
});

document.getElementById("sendMessage").onclick = () => {
  const messageField = document.getElementById("cMessage");
  const data = messageField.value;

  // clearing the message field
  messageField.value = "";

  socket.emit("message", data);
};
