const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/users.router");
const postRouter = require("./routes/posts.router");
const categoryRouter = require("./routes/categories.router");
const cors = require("cors");
const morgan = require("morgan");

// configure morgan
app.use(morgan("dev"));

require("./configs/db.connection");

dotenv.config();
app.use(express.json());
// enable cors
app.use(cors());


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

app.listen(8000, () => {
  console.log(`Backend server is running on ${process.env.APP_URL}`);
});
