const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => v.length > 2,
      message: (props) => `${props.value} is invalid`,
    },
  },
  createdAt: { type: Date, immutable: true },
  modifiedAt: { type: Date, default: () => Date.now() },
});
adminSchema.virtual("fullName").get(function () {
  return `Mr. ${this.name}`;
});
// Create a model
const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
