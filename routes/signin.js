const express = require("express");
const app = express();
const router = express.Router();

const controller = require("../controllers/user");

router.get('/', controller.get);
router.post('/signin', controller.signin);

module.exports = router;