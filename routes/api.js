var express = require('express');
const db = require('../utiles/db');
var router = express.Router();

/* GET users listing. */
router.get('/data', function (req, res, next) {
    res.redirect('/');
});

router.route('/login').post(function (req, res, next) {
    db.queryAsync(`SELECT id, name, password, privilege FROM user WHERE name = ${req.body.login} LIMIT 1`)
        .then((result) => {
            if (req.body.password === result[0].password) {
                req.session.user = result[0];
            }
            res.redirect('/');
        }).catch((err) => console.log(err));
});

router.route('/edit/:id').post(function (req, res, next) {

    db.queryAsync(`UPDATE post SET title = ? , body = ? WHERE id = ? LIMIT 1`,
        [req.body.title, req.body.body, req.params.id]
    ).then((result) => {

        res.redirect('/');
    }).catch((err) => console.log(err));
});

router.route('/addpost').post(function (req, res, next) {

    db.queryAsync(`insert post (title, body, time) values (?, ?, ?)`, [req.body.title, req.body.body, new Date().getTime() / 1000])
        .then((result) => {

            res.redirect('/')
        }).catch((err) => console.log(err));
});

router.route('/delete/:id').get(function (req, res, next) {
    if (!req.session && req.session.user.privilege !== 1) {
        res.redirect('/');
        return;
    }
    db.queryAsync(`DELETE FROM \`post\` WHERE \`post\`.\`id\` = ?`, [req.params.id])
        .then((result) => {
          res.redirect('/');
          db.conn.end();
        }).catch((err) => {
        console.log(err);
        res.render('error', {error: 500})
    });
});
module.exports = router;
