const express = require('express');
const router = new express.Router();
const db = require('../db/dbFunctions');
const async = require('async');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload =  multer({dest: 'public/img/uploads'});
const session = require('express-session');

const app = express();

app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'piesaredeliciousandiwanttoeatthem',
    cookie: {
        maxAge: 36000000,
        sameSite: true
    }
}));

const redirectLogin = (req, res, next) => {
    //***************UNCOMMENT!!!***************** */
    if( !req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}

const redirectHome = (req, res, next) => {
    if( req.session.userId) {
        res.redirect('/editHome');
    } else {
        next();
    }
}

//*****************Login************************/
router.get('/login', redirectHome, (req, res) => {
    res.render('admin/login', {
        title: 'Welcome'
    });
});

router.post('/createUser', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.createUser(req.body.username, hash);
    });
    res.render('admin/login'), {
        title: 'Welcome'
    }    
});

router.post('/login', (req, res) => {
    const { userId } = req.session;
    db.getHash(req.body.username, async (error, hash) => {
        try {
            console.log(req.body.password);
            const match = await bcrypt.compare(req.body.password, hash[0].password);
            if(match) {
                db.getUser(req.body.username, (err, user) => {
                    console.log(user);
                    req.session.userId = user[0].id;
                    return res.redirect('/editHome');
                });
            } 
            else{
                res.render('admin/login'), {
                    title: 'Welcome',
                    message: 'Login unsuccessful.  Please try again'
                }
            }
        }
        catch(error) {
            console.log('firing catch');
            console.log(error);
            res.render('admin/login'), {
                title: 'Welcome',
                message: 'Login unsuccessful.  Please try again'
            }
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        res.clearCookie('sid');
        res.redirect('/login');
    })
})

//*****************Home************************/
router.get('/editHome', redirectLogin, (req, res) => {
    console.log(req.session);
    res.render('admin/editHome', {
        title: "Welcome"
    });
});

//*****************Stock************************/
router.get('/editStock', redirectLogin, (req, res) => {
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

router.post('/editStock', redirectLogin, upload.single('stockImg'), (req,res) => {
    const path = '/img/uploads/' + req.file.filename;
    const itemName = req.body.itemName;
    const itemdescription = req.body.itemDescription;
    const price = req.body.price;
    const quantity = req.body.quantity;
    async.series([
        db.addStock.bind(db, itemName, itemdescription, price, quantity, path),
        db.getStockDropdown.bind(db),
        db.getStock.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editStock', {
            title: 'Edit Stock',
            dropdown: result[1],
            table: result[2] 
        });
    });
});

router.get('/deleteStock', redirectLogin, (req, res) => {
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

router.post('/updateStock', redirectLogin, (req, res) => {
    async.series([
        db.updateStock.bind(db, req.body.stock),
        db.getStockDropdown.bind(db),
        db.getStock.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editStock', {
            title: 'Edit Stock',
            dropdown: result[1],
            table: result[2] 
        });
    });
});


//*****************Updates*********************/
router.get('/editUpdates', redirectLogin, (req,res) => {
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

router.post('/editUpdate', redirectLogin, upload.single('updateImg'), (req, res) => {
    var path = null;
    if(req.file && req.file.filename != undefined){
        var path = '/img/uploads/' + req.file.filename;
    }
    const title = req.body.updateTitle;
    const text = req.body.updateText;
    async.series([
        db.addUpdates.bind(db, title, text, path),
        db.updateDropdown.bind(db),
        db.getUpdates.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editUpdates', {
            title: 'Edit Updates',
            dropdown: result[1],
            updates: result[2] 
        });
    });
});

router.get('/deleteUpdate', redirectLogin, (req, res) => {
    const title = req.query.deleteTitle;
    db.deleteUpdate(title);
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


router.post('/changeUpdates', redirectLogin, (req,res) => {
    async.series([
        db.editUpdates.bind(db, req.body.updates),
        db.updateDropdown.bind(db),
        db.getUpdates.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editUpdates', {
            title: 'Edit Updates',
            dropdown: result[1],
            updates: result[2] 
        });
    });
});

//*****************Calendar*********************/
router.get('/editCalendar', redirectLogin, (req,res) => {
    db.getEvents((err, result) => {
        res.render('admin/editCalendar', {
            title: 'Edit Calendar',
            event: result
        }); 
    }); 
})

router.post('/editCalendar', redirectLogin, (req, res) => {
    const name = req.body.eventName;
    const sDate = req.body.sYear + '-' + req.body.sMonth + '-' + req.body.sDay;
    const sYearMonth = req.body.sYear + '-' + req.body.sMonth;
    if(req.body.eYear) {
        var eDay = Number(req.body.eDay) + 1;
        var eDate = req.body.eYear + '-' + req.body.eMonth + '-' + eDay;
    } else {
        eDate = null;
    }
    if(req.body.sRecurMonth) {
        var sRecurDay = Number(req.body.sRecurDay) + 1;
        var sRecurDate = req.body.sRecurYear + '-' + req.body.sRecurMonth + '-' + sRecurDay;
        var eRecurDay = Number(req.body.eRecurDay) + 1;
        var eRecurDate = req.body.eRecurYear + '-' + req.body.eRecurMonth + '-' + eRecurDay;
        if(req.body.daysOfWeek.length == 1) {
            var daysOfWeek = '{' + req.body.daysOfWeek + '}';
        }
        else { var daysOfWeek = req.body.daysOfWeek;
        }
    } else {
        sRecurDate = null;
        eRecurDate = null;
        daysOfWeek = null;
    }
    async.series([
        db.addEvent.bind(db, name, sDate, sYearMonth, eDate, daysOfWeek, sRecurDate, eRecurDate),
        db.getEvents.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editCalendar', {
            title: 'Edit Calendar',
            event: result[1]
        });
    });
});

router.get('/editEvent', redirectLogin, (req, res) => {
    var editDate = req.query.selectYear + '-' + req.query.selectMonth;
    db.getEditEvents(editDate, (err, result) => {
        res.render('admin/editEvent', {
            title: 'Edit Events',
            event: result
        });
    });
});

router.post('/editEvent', redirectLogin, (req, res) => {
    async.series([
        db.editEvents.bind(db, req.body.editEvent),
        db.getEvents.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editCalendar', {
            title: 'Edit Calendar',
            event: result[1]
        });
    });
});

router.get('/deleteEvent', redirectLogin, (req, res) => {
    async.series([
        db.deleteEvent.bind(db, req.query.deleteId),
        db.getEvents.bind(db)
    ], function (error, result) {
        if (error) {
            res.status(500).send('Error: ' + error);
            return;
        }
        res.render('admin/editCalendar', {
            title: 'Edit Calendar',
            event: result[1]
        });
    });
});

module.exports = router;