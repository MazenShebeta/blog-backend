const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/users.router");
const postRouter = require("./routes/posts.router");
const categoryRouter = require("./routes/categories.router");
const cors = require("cors");
const morgan = require("morgan");
require("colors")
require("pretty-error").start();

// configure morgan
app.use(morgan("dev"));


dotenv.config();
app.use(express.json());
// enable cors
app.use(cors());
require("./configs/db.connection");


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

app.use("/", (req, res) => {
  res
    .status(200)
    .json(
      "Welcome to Blogarista-API, please refere to the documentation for more information"
    );
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
