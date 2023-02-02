var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

function loginCheck(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render("main", { isLogin: false });
    }
}

function introLoginCheck(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render("intro", { isLogin: false });
    }
}

function menuLoginCheck(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render("menu", { isLogin: false });
    }
}

function boardCheck(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.render("alert", { isLogin: false, msg: "로그인 후 이용 가능합니다." });
    }
}

function bookingCheck(req, res, next) {
    if (req.session.user) {
        console.log("유저 있음");
        next();
    } else {
        console.log("유저 없음");
        res.render('booking', { isLogin: false, mindate: moment().format("YYYY-MM-DD") });
    }
}

module.exports = { loginCheck, introLoginCheck, menuLoginCheck, boardCheck, bookingCheck }
