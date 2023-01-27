const BoardTask = require("../models/Board");

var moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


exports.get = function(req, res) {
    console.log("---- Board List!! ----");
    BoardTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
        res.render("board", { data: tasks, userid: req.session.user.userid, username: req.session.user.username, isLogin: true });
    });
};

exports.write = async function(req, res) {
    const username = req.session.user.username;
    try {
        const boardTask = new BoardTask({
            content: req.body.content,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            username: username
        });
        await boardTask.save();
        console.log("==== Success!! Save new Content ====");
        res.redirect("/board");
    } catch(err) {
        console.error("==== Fail!! Save Content");
        res.redirect("/board");
    }
};

exports.edit = function(req, res) {
    const editid = req.params.id;

    BoardTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {
        res.send({ data: tasks, idTask: editid, userid: req.session.user.userid, username: req.session.user.username, isLogin: true });
    });
};

exports.update = function(req, res) {
    const id = req.params.id;
    BoardTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if(err) {
            console.log("==== Fail!! Update ====");
            console.error(err);
        }
        console.log("==== Success!! Update ====");
        res.redirect("/board");
    });
}

exports.remove = async function(req, res) {
    const id = req.params.id;
    BoardTask.findByIdAndRemove(id, err => {
        if(err) {
            console.error(err);
        }
        console.log("==== Success!! Remove Content ====");
        res.redirect("/board");
    });
};