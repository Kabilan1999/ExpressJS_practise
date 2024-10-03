const adminModel = require("../model/adminSchema");

const getAllAdmin = async (req, res) => {
  try {
    let admin = await adminModel.find();
    const updatedAdmin = admin.map((doc) => {
      return {
        ...doc.toObject(),
        fullName: doc.fullName, // Add a new field dynamically
      };
    });
    res.json(updatedAdmin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createNewAdmin = async (req, res) => {
  try {
    if (req.body.id) {
      const updatedAdmin = {
        id: req.body.id,
        name: req.body.name,
        modifiedAt: Date.now(),
      };
      const existingUser = await adminModel.findOne({ name: req.body.name });
      if (existingUser) {
        return res.status(400).json({
          errorMessage: "Name already exists. Please choose a unique name.",
        });
      }
      const admin = await adminModel.findOneAndUpdate(
        { id: req.body.id },
        updatedAdmin,
        { new: true, runValidators: true }
      );
      if (!admin) {
        return res.status(400).json({ errorMessage: "Admin not found" });
      }
      res.json(admin);
    } else {
      //   const existingUser = await adminModel.findOne({ name: req.body.name });
      //   if (existingUser) {
      //     return res.status(400).json({
      //       errorMessage: "Name already exists. Please choose a unique name.",
      //     });
      //   }
      const admin = await adminModel.find();
      const newAdmin = new adminModel({
        id: admin?.length ? admin[admin.length - 1].id + 1 : 1,
        name: req.body.name,
        createdAt: Date.now(),
      });
      await newAdmin.save();
      res.status(201).json(newAdmin);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    console.log(req);
    const admin = await adminModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!admin) {
      return res.status(400).send("admin not found");
    }
    res.status(200).send("admin deleted successfully");
  } catch (error) {
    res.status(404).json({ errorMessage: error.message });
  }
};

module.exports = {
  getAllAdmin,
  createNewAdmin,
  deleteAdmin,
};
