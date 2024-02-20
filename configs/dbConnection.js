const mongoose = require("mongoose");

// Retrieve the DB_CONNECTION variable from the environment
const dbConnString = 'mongodb+srv://MazenShebeta:RCW8ANthQLEPmc4e@blog.mzhekcf.mongodb.net/?retryWrites=true&w=majority';
console.log("🚀 ~ dbConnString:", dbConnString)

// Connect to the MongoDB database using mongoose
mongoose.set('strictQuery', false);
mongoose.connect(dbConnString);
mongoose.set('strictQuery', false);

// Check if the connection was successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});
