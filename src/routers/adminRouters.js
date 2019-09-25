const express = require('express');
const router = new express.Router();

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Welcome'
    });
});

router.get('/editHome', (req, res) => {
    res.render('editHome', {
        title: "Welcome"
    });
});

router.get('/editCalendar', (req, res) => {
    res.render('editCalendar', {
        title: 'Edit Calendar'
    });
});

router.get('/editStock', (req,res) => {
    res.render('editStock', {
        title: 'Edit Stock'
    });
});

router.get('/editUpdates', (req,res) => {
    res.render('editUpdates', {
        title: 'Edit Updates'
    });
});

module.exports = router;