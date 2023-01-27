const Booking = require("../models/Booking");

exports.booking = async function(req, res) {
    console.log("---- Booking Page!!! ----");
    const bookingAlready = await Booking.findOne(
        { 
            time: req.body.time,
            date: req.body.date 
        }
    );
    console.log(bookingAlready);
    try {
        if (bookingAlready) {
            res.render("alert", { msg: "해당 시간은 예약이 마감되었습니다."});
        } else {
            if (req.body.membership == 'member') {
                const newBooking = new Booking({
                    membership: req.body.membership,
                    type: req.body.type,
                    date: req.body.date,
                    time: req.body.time,
                    username: req.session.user.username,
                    tel: req.body.tel,
                    comment: req.body.comment
                });
                await newBooking.save();
            } else if (req.body.membership == 'nonmember') {
                const newBooking = new Booking({
                    membership: req.body.membership,
                    type: req.body.type,
                    date: req.body.date,
                    time: req.body.time,
                    username: req.body.username,
                    tel: req.body.tel,
                    comment: req.body.comment
                });
                await newBooking.save();
            }
        }
        console.log("booking complete!!!");
        res.render('alert', {msg: "예약이 완료되었습니다."});
    } catch (err) {
        console.error(err);
        console.log("booking error!!!");
        res.render('alert', {msg: "예약을 하는 도중 문제가 발생했습니다. 다시 시도해주세요."});
    }
}

exports.bookcheck = async function(req, res) {
    Booking.find({}, null, {sort: {date: -1}}, (err, books) => {
        res.render('bookcheck', { data: books });
    })
}