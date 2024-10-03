const employeeModel = require("../model/employerSchema");

const getAllEmployees = async (req, res) => {
  try {
    let employees = await employeeModel.find();
    const updatedEmployee = employees.map((doc) => {
      return {
        ...doc.toObject(),
        fullName: doc.fullName, // Add a new field dynamically
      };
    });
    res.json(updatedEmployee);
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
        modifiedAt: Date.now(),
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
        createdAt: Date.now(),
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
      modifiedAt: Date.now(),
    };
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
      id: req.body.id,
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
    const modifiedUser = {
      ...employee.toObject(),
      fullName: employee.fullName, // Add a new field dynamically
    };

    res.json(modifiedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// for filter
// const employee = await employeeModel .where('firsName').equals("Kabilan").where("age").lt(85).limit(1)
// for populate
// const employee = await employeeModel .where('firsName').equals("Kabilan").where("age").lt(85).limit(1).populate("bestfriend")
// here details of employee will populate in bestfriend column if it has the same object id as employee thus making the join easier

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
