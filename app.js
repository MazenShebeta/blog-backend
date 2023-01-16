const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
// const postRouter = require("./routes/posts");
// const categoryRouter = require("./routes/categories");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  // app.use("/api/posts", postRouter);
  // app.use("/api/categories", categoryRouter);

app.listen(8000, () => {
  console.log("Backend server is running!");
});
