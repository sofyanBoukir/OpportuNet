const express = require("express");
const dbConnect = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

dbConnect();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.use("/users", express.static("public/users"));
app.use("/posts", express.static("public/posts"));

app.use("/auth", require("./routes/auth"));
app.use("/home",require("./routes/home"));
app.use("/interest", require("./routes/interest"));
app.use("/profile", require("./routes/profile"));
app.use("/post",require("./routes/post"));

app.listen(process.env.PORT, () => {
  console.log(`User service is running on port ${process.env.PORT}`);
});
