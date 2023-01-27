const express = require("express");
const app = express();
const router = express.Router();

const { loginCheck, boardCheck } = require('../middleware/loginCheck');

const SignInRouter = require('./signin');
const SignUpRouter = require('./signup');
const BoardRouter = require('./board');
const BookingRouter = require('./booking');
const controller = require("../controllers/user");


router.get('/', loginCheck, function(req, res) {
    res.render('main', { userid: req.session.user.userid, username: req.session.user.username, isLogin: true });
});
router.get('/intro', function(req, res) {
    res.render('intro');
})
router.get('/menu', function(req, res) {
    res.render('menu');
});
router.use('/board', boardCheck, BoardRouter);
router.use('/booking', BookingRouter);
router.use('/signin', SignInRouter);
router.use('/signup', SignUpRouter);

router.get('/logout', async function(req, res) {
    if (req.session.user) {
        console.log('로그아웃 처리');
        req.session.destroy(
            function(err) {
                if(err) {
                    console.log('세션 삭제 중 에러');
                    return;
                }
                console.log('세션 삭제 성공');
                res.redirect('/');
            }
        );
    } else {
        console.log('로그인 안되어있음');
        res.redirect('/');
    }
})

module.exports = router;