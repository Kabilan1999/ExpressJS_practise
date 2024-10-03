const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length > 2,
      message: (props) => `${props.value} is invalid`,
    },
  },
  lastName: { type: String, required: true },
  createdAt: { type: Date, immutable: true },
  modifiedAt: { type: Date, default: () => Date.now() },
});
employeeSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});
// Create a model
const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;
