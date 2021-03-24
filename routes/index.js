var express = require('express');
const db = require('../utiles/db');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
    console.log(db.conn);
    if (req.session.user) {
        let numRows;
        let numPerPage = 5;
        let page = parseInt(req.query.page, 10) || 0;
        let numPages;
        let skip = page * numPerPage;
        let limit = skip + ',' + numPerPage;
        db.queryAsync('SELECT count(*) as numRows FROM post')
            .then(function (results) {
                numRows = results[0].numRows;
                numPages = Math.ceil(numRows / numPerPage);
                console.log('number of pages:', numPages);
            })
            .then(() => db.queryAsync('SELECT * FROM post ORDER BY ID DESC LIMIT ' + limit))
            .then(function (results) {
                let responsePayload = {
                    posts: results
                };
                if (page < numPages) {
                    responsePayload.pagination = {
                        current: page,
                        perPage: numPerPage,
                        previous: page > 0 ? page - 1 : undefined,
                        next: page < numPages - 1 ? page + 1 : undefined
                    }
                } else responsePayload.pagination = {
                    err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
                };
                res.render('index', {title: 'Posts', data: responsePayload, user: req.session.user});
            }).then(() => {

        }).catch(function (err) {
            console.error(err);
            res.json({err: err});
        });
    } else {
        // not logged in
        res.render('login', {title: 'Express'});
    }
});

router.get('/postadd', function (req, res, next) {
    console.log(req.session.user);
    if (req.session.user && req.session.user.privilege === 1) {
        res.render('addpost', {title: 'Add Post'});
    } else {
        res.end("do not have privilege or not logged in")
    }
});

router.get('/post/:id', function (req, res, next) {

    db.queryAsync("SELECT * from post WHERE id = ?", [req.params.id])
        .then((result) => {
            if (result[0]) {
                res.render('post', {title: 'Post ' + result[0].title, post: result[0], user: req.session.user});
                return;
            }
            db.conn.end();
            res.render('error', {message: 'not found', error: {status: "404"}});
        }).catch((err) => {
        console.log(err);
    });
});

router.route('/edit/:id').get(function (req, res, next) {
    if (!req.session && req.session.user.privilege !== 1) {
        res.redirect('/');
        return;
    }
    db.conn.connect();
    db.queryAsync(`SELECT * FROM post WHERE post.id = ?`, [req.params.id])
        .then((result) => {

            res.render('editpost', {post: result[0]});
        }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;
