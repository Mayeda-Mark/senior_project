const express = require('express');
const { Pool } = require('pg');
const router = new express.Router();
const db = require('../db/dbFunctions');
const connectionString = process.env.DATABASE_URL || 'postgres://shrrdpdlinqgpf:27ffb3fc195dd896f00335db1c2b4fcbe229c23a3255cd1e5dcec86373faa3ee@ec2-54-235-180-123.compute-1.amazonaws.com:5432/defe8vag2516cd?ssl=true';
const pool = new Pool({connectionString: connectionString});

router.get('/login', (req, res) => {
    res.render('admin/login', {
        title: 'Welcome'
    });
});

router.get('/editHome', (req, res) => {
    res.render('admin/editHome', {
        title: "Welcome"
    });
});

router.get('/editCalendar', (req, res) => {
    res.render('admin/editCalendar', {
        title: 'Edit Calendar'
    });
});

router.get('/editStock', (req,res) => {
    db.getStockDropdown((error, result1) => {
        db.getStock((error, result2) => {
            res.render('admin/editStock', {
                title: 'Edit Stock',
                dropdown: result1,
                table: result2 
            });
        });
    });
});

router.get('/addStock', (req,res) => {
    const itemName = req.query.itemName;
    const itemdescription = req.query.itemDescription;
    const price = req.query.price;
    const quantity = req.query.quantity;
    console.log(itemName);
    console.log(itemdescription);
    console.log(price);
    console.log(quantity);
    db.addStock(itemName, itemdescription, price, quantity);
    db.getStockDropdown((error, result1) => {
        db.getStock((error, result2) => {
            res.render('admin/editStock', {
                title: 'Edit Stock',
                dropdown: result1,
                table: result2 
            });
        });
    });
});

router.get('/removeStock', (req, res) => {
    const itemName = req.query.stock;
    db.removeStock(itemName);
    db.getStockDropdown((error, result1) => {
        db.getStock((error, result2) => {
            res.render('admin/editStock', {
                title: 'Edit Stock',
                dropdown: result1,
                table: result2 
            });
        });
    });
});

router.get('/updateStock', (req, res) => {
    const itemName = req.query.itemName;
    const itemDescription = req.query.itemDescription;
    const price = req.query.price;
    const quantity = req.query.quantity;
    db.updateStock(itemName, itemDescription, price, quantity);
    db.getStockDropdown((error, result1) => {
        db.getStock((error, result2) => {
            res.render('admin/editStock', {
                title: 'Edit Stock',
                dropdown: result1,
                table: result2 
            });
        });
    });
});

router.get('/editUpdates', (req,res) => {
    db.updateDropdown((error1, result1) => {
        db.getUpdates((error2, result2) => {
            res.render('admin/editUpdates', {
                title: 'Edit Updates',
                dropdown: result1,
                updates: result2
            });
        });
    });
});


router.post('/editStock'), (req, res) => {

}

module.exports = router;

