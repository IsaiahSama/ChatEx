const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
const PORT = 5000;
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: corsOptions,
});

app.use(cors(corsOptions));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Server Stuff
http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

let clients = []; // This will store all connected clients

const broadcastMessage = (clientID, message) => {
  clients.map((client) => client.emit("message", clientID, message));
};

io.on("connection", (socket) => {
  console.log("Connection with socket established");

  clients.push(socket);

  // Listeners can go here!
  socket.on("message", (message) => {
    broadcastMessage(socket.id, message);
  });

  socket.on("disconnect", () => {
    clients = clients.filter((value) => value != socket);
    console.log("Client has disconnected!");
  });
});

module.exports = app;
