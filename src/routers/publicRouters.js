const express = require('express');
const router = new express.Router();
const db = require('../db/dbFunctions');
const async = require('async');


router.get('', (req, res) => {
    res.render('public/home', {
        title: 'Home'
    });
});

router.get('/calendar', (req, res) => {
    db.getEvents((err, result) => {
        res.render('public/calendar', {
            title: 'Calendar',
            event: result
        });
    })
});

router.get('/connect', (req, res) => {
    res.render('public/connect', {
        title: 'Connect With Us'
    });
});

router.get('/stock', (req, res) => {
    db.getStock((error, result) => {
        res.render('public/stock', {
            title: 'Here\'s What We\'re Baking Today',
            table: result
        });
    });
});

router.get('/updates', (req, res) => {
    db.getUpdates((error, result) => {
        res.render('public/updates', {
            title: 'Updates',
            updates: result
        });
    });
});

module.exports = router