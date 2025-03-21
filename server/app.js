const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const http = require('http')
const { Server } = require("socket.io");
const { registerUser, users } = require("./sockets/connected-users");
const getMissedNotifications = require("./sockets/missed-notifications");
const eventListennerOnNotificationModel = require("./sockets/real-time-notifications");
const { initialSocket } = require("./sockets/socket");

const app = express();
const server = http.createServer(app);


app.use(cors({
  origin : process.env.FRONTEND_URL,
  methods : ['GET','POST','PUT','DELETE']
}));


const io = initialSocket(server);
dbConnect();

app.use(express.json());

app.use("/users", express.static("public/users"));
app.use("/posts", express.static("public/posts"));

app.use("/auth", require("./routes/auth"));
app.use("/home",require("./routes/home"));
app.use("/interest", require("./routes/interest"));
app.use("/profile", require("./routes/profile"));
app.use("/post",require("./routes/post"));
app.use("/comment",require("./routes/comment"));
app.use("/notification",require("./routes/notification"))
app.use("/saved",require("./routes/saved"));
app.use("/follow",require("./routes/follow"));



server.listen(process.env.PORT, () => {
  console.log(`User service is running on port ${process.env.PORT}`);
});


module.exports = { io }