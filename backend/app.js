const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const fileUpoad = require("express-fileupload");
const errorHandler = require("./middlewares/errorMiddleare");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CORS_ORIGIN,
    // credentials: true,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  fileUpoad({
    createParentPath: true,
  })
);

// routes
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/subtitles", require("./routes/subtitleRoute"));
app.use("/api/conversations", require("./routes/conversationRoute"));
app.use("/api/messages", require("./routes/messageRoute"));

// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

const port = process.env.PORT;

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => socket.io(room).emit("typing"));

  socket.on("new message", (newMessageReceived) => {
    const { chat, sender, recipient } = newMessageReceived;

    io.to(recipient._id).emit("message received", newMessageReceived);
  });
});

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    server.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
