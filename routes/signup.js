const express = require("express");
const app = express();
const router = express.Router();

const controller = require("../controllers/user");

router.get('/', controller.getup);
router.post('/signup', controller.signup);

module.exports = router;