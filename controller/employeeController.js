const employeeModel = require("../model/employeeSchema");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createNewEmployee = async (req, res) => {
  try {
    if (req.body.id) {
      const updatedEmployee = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      const employee = await employeeModel.findOneAndReplace(
        { id: req.body.id },
        updatedEmployee,
        { new: true, runValidators: true }
      );
      if (!employee) {
        return res.status(400).json({ errorMessage: "User not found" });
      }
      res.json(employee);
    } else {
      const employees = await employeeModel.find();
      const newEmployee = new employeeModel({
        id: employees?.length ? employees[employees.length - 1].id + 1 : 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });
      await newEmployee.save();
      res.status(201).json(newEmployee);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = {
      id: req.body.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    if (
      !updatedEmployee.firstname ||
      !updatedEmployee.lastname ||
      !updatedEmployee.id
    ) {
      return res
        .status(400)
        .json({ errorMessage: "First and last names are required." });
    }
    const employee = await employeeModel.findOneAndUpdate(
      { id: req.body.id },
      updatedEmployee,
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(400).json({ errorMessage: "User not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!employee) {
      return res.status(400).send("employee not found");
    }
    res.status(200).send("employee deleted successfully");
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.findOne({ id: req.params.id });
    if (!employee) {
      return res.status(400).send("User not found");
    }
    res.json(employee);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
