const express = require('express');
const router = new express.Router();

router.get('', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

router.get('/calendar', (req, res) => {
    res.render('calendar', {
        title: 'Calendar'
    });
});

router.get('/connect', (req, res) => {
    res.render('connect', {
        title: 'Connect With Us'
    });
});

router.get('/stock', (req, res) => {
    res.render('stock', {
        title: 'Here\'s What We\'re Baking Today'
    });
});

module.exports = router