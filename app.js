const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/usersRouter");
const postRouter = require("./routes/postsRouter");
const categoryRouter = require("./routes/categoriesRouter");
const cors = require("cors");
const morgan = require("morgan");

// configure morgan
app.use(morgan("dev"));

require("./configs/dbConnection");

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
