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

app.use("/posts", express.static("public/posts"));

app.use("/post", require("./routes/post"));
// app.use("/comment", require("."))
// app.use("/like", require("."))


app.listen(process.env.PORT, () => {
  console.log(`User service is running on port ${process.env.PORT}`);
});
