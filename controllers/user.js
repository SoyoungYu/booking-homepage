const express_session = require('express-session');
const bcrypt = require('bcrypt');
const User = require("../models/User");

exports.get = function(req, res) {
    console.log("==== Welcome Login Page ====");
    res.render('signin', {msg: 'signin'});
};

exports.getup = function(req, res) {
    console.log("==== Welcome SignUp Page ====");
    res.render('signup', {msg: 'signup'});
};

exports.signup = async function(req, res) {
    const userpw = req.body.userpw;
    const userpwcheck = req.body.userpwcheck;
    const hashpw = bcrypt.hashSync(userpw, 10);

    const userCheck = await User.findOne({ userid: req.body.userid });

    if (userCheck) {
        res.render("alert", {msg: "이미 존재하는 아이디입니다."});
    } else if (userpw === userpwcheck) {
        try {
            const user = new User({
                username: req.body.username,
                userid: req.body.userid,
                userpw: hashpw
            });
    
            await user.save();
            console.log("==== Success!! Save User ====");
            res.redirect("/signin");
        } catch(err) {
            console.error("==== Fail!! Save User ====");
            res.redirect("/signin");
        }
    } else {
        res.render('alert', {msg: "비밀번호가 일치하지 않습니다. 다시 확인해주세요"});
    }
};

exports.signin = async (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    const user = await User.findOne({ userid: userid })

    if (!user) {
        res.render('alert', {msg: "아이디가 존재하지 않습니다."});
        console.log('ID Fail');
    } else if (await bcrypt.compare(userpw, user.userpw)) {
        req.session.user = {
            userid: userid,
            username: user.username
        }
        
        res.render('main', { userid: req.session.user.userid, username: req.session.user.username, isLogin: true });

        console.log('Login Success');
    } else {
        res.render('alert', {msg: "비밀번호가 일치하지 않습니다."});
        console.log('Password Fail');
    }
}