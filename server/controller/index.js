const express = require('express');

const router = express.Router();

//Import model here
const user = require('../model/user.js');

//Get all users
router.get('/', function (req, res) {
    user.selectAll(function (data) {
        const obj = {
            users: data
        };
        console.log(obj);
        res.render('index', obj);
    });
});


// Post new user to database 
router.post('/', function (req, res) {
    // user.insertOne([
    //     'burger_name', 'devoured'
    // ], [
    //     req.body.burger_name, req.body.devoured
    // ], function () {
    //     res.redirect('/');
    // });
});

//Update user
router.put('/:id', function (req, res) {
    const condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    // burger.updateOne({
    //     devoured: req.body.devoured
    // }, condition, function () {
    //     res.redirect('/');
    // });
});

// Export routes for server.js to use.
module.exports = router;