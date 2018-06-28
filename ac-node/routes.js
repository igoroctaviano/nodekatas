const fs = require("fs");

const Router = require("./modules/router");
const router = new Router();

const BaseController = require("./controllers/BaseController");

router.get("/", BaseController.home);
router.get("/test", BaseController.test);
router.get("/createTable", BaseController.createTable);
router.get("/insertEmployee", BaseController.insertEmployee);
router.get("/insertMultipleEmployee", BaseController.insertMultipleEmployee);
router.get("/selectEmployees", BaseController.selectEmployees);

module.exports = router;
