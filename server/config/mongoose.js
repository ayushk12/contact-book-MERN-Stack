const mongoose = require("mongoose");

//connect to the database
if (process.env.NODE_ENV === "production")
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connect("mongodb://localhost/contact_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to db"));

db.once("open", function () {
  console.log("succesfully connected to database");
});
