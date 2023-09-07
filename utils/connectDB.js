const mongoose = require('mongoose')

module.exports = function connectDB() {
  // Connect to database
  mongoose.connect(process.env.MONGO_URI);

  //Check for connection
  const db = mongoose.connection;
  db.on("error", (e) => console.log(error));
  db.on("open", () => console.log("Connected to MongoDB"));
  db.on("close", () => console.log("MongoDB disconnected"));
};
