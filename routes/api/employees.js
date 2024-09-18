const express = require("express");
const router = express.Router();
const employeeController = require("../../controller/employeeController");

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createNewEmployee)
  .put(employeeController.updateEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
