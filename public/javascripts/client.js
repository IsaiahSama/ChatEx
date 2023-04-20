const socket = io("http://localhost:5000");

const messagesDiv = document.getElementById("messagesDiv");
const onlineCount = document.getElementById("users");

socket.emit("handshake", "connecting to server");

socket.on("connect", (...args) => {
  console.log("Connected to server");
});

socket.on("user-update", (online) => {
  onlineCount.innerText = online;
});

socket.on("message", (senderID, message) => {
  const messageDiv = document.createElement("div");
  const nameDiv = document.createElement("div");
  const contentDiv = document.createElement("div");

  messageDiv.className = "message ";
  nameDiv.className = "sender";
  contentDiv.className = "messageContent";

  let name = senderID == socket.id ? "You" : "Otherworlder";

  nameDiv.innerText = name;
  contentDiv.innerText = message;

  // Need to add the correct styling for the message container.
  messageDiv.className += senderID == socket.id ? "user" : "client";

  messageDiv.appendChild(nameDiv);
  messageDiv.appendChild(contentDiv);

  messagesDiv.appendChild(messageDiv);
});

const emitMessage = () => {
  const messageField = document.getElementById("cMessage");
  const data = messageField.value;

  // clearing the message field
  messageField.value = "";

  if (data.length < 1) {
    alert("You can not send an empty message!");
    return;
  }
  socket.emit("message", data);
};

document.getElementById("sendMessage").onclick = emitMessage;
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    // Nasty shortcut cause I can't be bothered with forms and the page refreshing.
    emitMessage();
  }
});
