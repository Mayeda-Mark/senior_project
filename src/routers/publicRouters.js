const express = require('express');
const { Pool } = require('pg');
const router = new express.Router();
const db = require('../db/dbFunctions');
const connectionString = process.env.DATABASE_URL || 'postgres://shrrdpdlinqgpf:27ffb3fc195dd896f00335db1c2b4fcbe229c23a3255cd1e5dcec86373faa3ee@ec2-54-235-180-123.compute-1.amazonaws.com:5432/defe8vag2516cd?ssl=true';
const pool = new Pool({connectionString: connectionString});


router.get('', (req, res) => {
    res.render('public/home', {
        title: 'Home'
    });
});

router.get('/calendar', (req, res) => {
    res.render('public/calendar', {
        title: 'Calendar'
    });
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