const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// Create a model
const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;
