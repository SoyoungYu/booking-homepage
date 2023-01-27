const express = require("express");
const app = express();
const router = express.Router();

const { bookingCheck } = require('../middleware/loginCheck');
const controller = require('../controllers/booking');

var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


router.get('/', bookingCheck, function(req, res) {
    res.render('booking', { mindate: moment().format("YYYY-MM-DD"), userid: req.session.user.userid, username: req.session.user.username, isLogin: true });
})
router.post('/booking', controller.booking);
router.get('/bookcheck', controller.bookcheck)

module.exports = router;