const express = require("express");
const router = express.Router();
const adminController = require("../../controller/adminController");

router
  .route("/")
  .get(adminController.getAllAdmin)
  .post(adminController.createNewAdmin)
  .delete(adminController.deleteAdmin);


module.exports = router;
