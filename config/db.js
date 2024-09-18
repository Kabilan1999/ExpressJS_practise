const mongoose = require("mongoose");
const connectToEmployeeDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/Pracise", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = connectToEmployeeDb;
