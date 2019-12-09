const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://shrrdpdlinqgpf:27ffb3fc195dd896f00335db1c2b4fcbe229c23a3255cd1e5dcec86373faa3ee@ec2-54-235-180-123.compute-1.amazonaws.com:5432/defe8vag2516cd?ssl=true';
const pool = new Pool({connectionString: connectionString});
const async = require('async');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//****************************************** */
const JWT_SECRET = 'piesaredeliciousandiwanttoeatthem';
//******************************************* */

//*****************Stock************************/
//**************Stock Dropdown***********************/
const getStockDropdown = (callback) => {
    const sql = 'SELECT product_name FROM Stock ORDER BY product_name';
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while fetching for the stock dropdown');
            return console.log(err);
        }
        callback(null, result.rows);
    });
}

//**************Get Stock***********************/
const getStock = (callback) => {
    const sql = 'SELECT * FROM Stock ORDER BY product_name';
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while fetching for the stock dropdown');
            return console.log(err);
        }
        callback(null, result.rows);
    });
}

//****************Add Stock***********************/
const addStock = (itemName, itemDescription, price, quantity, path, callback) => {
    var params = [itemName, itemDescription, price, quantity, path];
    const sql = 'INSERT INTO Stock (product_name, description, price, inventory, img_path) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    pool.query(sql, params, (err,result) => {
        if(err) {
            console.log("An error with the database has occurred while adding an item to the stock");
            return console.log(err);
        }
        console.log('Stock Added!');
        callback(err, result);
    });
}

//****************Remove Stock********************/
const removeStock = (itemName) => {
    const sql = "DELETE FROM Stock WHERE product_name='" + itemName + "'";
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while deleting and entry from stock');
            return console.log(err);
        }
    });
}

//****************Update Stock********************/
const updateStock = (stock, callback) => {
    async.each(stock, (item, cb) => {
        var params = [item.itemName, item.itemDescription, item.price, item.quantity];
        const sql = 'UPDATE Stock SET product_name = $1, description = $2, price = $3, inventory = $4 WHERE product_name = $1';
        pool.query(sql, params, (err,result) => {
            if(err){
                console.log("An error with the database has occurred while editing the stock");
                console.log(err);
            }
            cb();
        });
    }, callback);
}

//*****************Updates************************/
//**************Get Updates***********************/
const getUpdates = (callback) => {
    const sql = 'SELECT * FROM Updates ORDER BY id';
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while fetching for the stock dropdown');
            return console.log(err);
        }
        callback(null, result.rows);
    });
}

//**************Update Dropdown************************/
const updateDropdown = (callback) => {
    const sql = 'SELECT * FROM Updates';
    pool.query(sql, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred");
			return console.log(err);
        }
        callback(null, result.rows);
    });
}

//**************Add Updates***********************/
const addUpdates = (title, update_text, path, callback) => {
    var d = new Date();
    var date = d.toLocaleDateString();
    const params = [title, update_text, date, path];
    console.log(title);
    console.log(update_text);
    const sql = 'INSERT INTO Updates (Title, Update_text, Date, img_path) VALUES ($1, $2, $3, $4) RETURNING *';
    pool.query(sql, params, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred");
			return console.log(err);
        }
        callback(null, result.rows);
    });
}

//****************Delete Update***********************/
const deleteUpdate = (title) => {
    const sql = "DELETE FROM Updates WHERE title='" + title + "'";
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while deleting and entry from Updates');
            return console.log(err);
        }
    });
}

//****************Edit Update***********************/
const editUpdates = (updates, callback) => {
    async.each(updates, (entry, cb) => {
        var params = [entry.title, entry.updateText, entry.id];
        const sql = 'UPDATE Updates SET Title = $1, update_text = $2 WHERE id = $3';
        pool.query(sql, params, (err, result1) => {
            if(err){
                console.log("An error with the database has occurred while editing the Updates");
                console.log(err1);
            }
            cb();
        });
    }, callback);
}

//****************Calendar************************/
//***************Get Events***********************/
const getEvents = (callback) => {
    const sql = 'SELECT * FROM Calendar';
    pool.query(sql, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred While getting events");
			return console.log(err);
        }
        callback(null, result.rows);
    });
}

//***************Get Edit Events***********************/
const getEditEvents = (selectDate, callback) => {
    const sql = "SELECT * FROM Calendar WHERE start_year_month = '" + selectDate + "'";
    pool.query(sql, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred While getting events");
			return console.log(err);
        }
        callback(null, result.rows);
    });
}

//***************Add Event***********************/
const addEvent = (eventName, sDate, sYearMonth, eDate, daysOfWeek, sRecurring, eRecurring, callback) => {
    if(eDate && !sRecurring) {
        console.log('Firing eDate without recurring');
        const params1 = [eventName, sDate, sYearMonth, eDate];
        const sql1 = 'INSERT INTO Calendar (event_name, start_date, start_year_month, end_date) VALUES($1, $2, $3, $4) RETURNING *';
        pool.query(sql1, params1, (err, result1) => {
            if(err) {
                console.log("An error with the database has occurred while adding an event.");
                return console.log(err);
            }
            callback(null, result1.rows);
        });
    } else if (eDate && sRecurring){
        console.log('Firing eDate with recurring');
        console.log(daysOfWeek);
        const params2 = [eventName, sDate, sYearMonth, eDate, daysOfWeek, sRecurring, eRecurring];
        const sql2 = 'INSERT INTO Calendar (event_name, start_date, start_year_month, end_date, days_of_week, start_recurring, end_recurring) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        pool.query(sql2, params2, (err, result2) => {
            if(err) {
                console.log("An error with the database has occurred while adding an event.");
                return console.log(err);
            }
            callback(null, result2.rows);
        });
    } else if (!eDate && sRecurring){
        console.log(daysOfWeek);
        console.log('Firing recurring without eDate');
        const params3 = [eventName, sDate, sYearMonth, daysOfWeek, sRecurring, eRecurring];
        const sql3 = 'INSERT INTO Calendar (event_name, start_date, start_year_month, days_of_week, start_recurring, end_recurring) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        pool.query(sql3, params3, (err, result3) => {
            if(err) {
                console.log("An error with the database has occurred while adding an event.");
                return console.log(err);
            }
            callback(null, result3.rows);
        });
    }else {
        const params4 = [eventName, sDate, sYearMonth];
        const sql4 = 'INSERT INTO Calendar (event_name, start_date, start_year_month) VALUES($1, $2, $3) RETURNING *';
        pool.query(sql4, params4, (err, result4) => {
            if(err) {
                console.log("An error with the database has occurred while adding an event.");
                return console.log(err);
            }
            callback(null, result4.rows);
        });
    }
}

//***************Edit Event***********************/
const editEvents = (events, callback) => {
    async.each(events, (event, cb) => {
        if(event.endDate && !event.startRecurring) {
            const params1 = [event.eventName, event.startDate, event.endDate, event.id];
            const sql1 = 'UPDATE Calendar SET event_name = $1, start_date = $2, end_date = $3 WHERE id = $4';
            pool.query(sql1, params1, (err, result1) => {
                if(err){
                    console.log("An error with the database has occurred while editing the Events");
                    console.log(err);
                }
                cb();
            });
        } else if(event.endDate && event.startRecurring) {
            const params2 = [event.eventName, event.startDate, event.endDate, event.daysOfWeek,event.startRecurring, event.endRecurring, event.id];
            const sql2 = 'UPDATE Calendar SET event_name = $1, start_date = $2, end_date = $3, days_of_week = $4, start_recurring = $5, end_recurring = $6,  WHERE id = $7';
            pool.query(sql2, params2, (err, result2) => {
                if(err){
                    console.log("An error with the database has occurred while editing the Events");
                    console.log(err);
                }
                cb();
            });
        } else if(!event.endDate && event.startRecurring) {
            const params3 = [event.eventName, event.startDate, event.daysOfWeek, event.startRecurring, event.endRecurring, event.id];
            const sql3 = 'UPDATE Calendar SET event_name = $1, start_date = $2, days_of_week = $3, start_recurring = $4, end_recurring = $5  WHERE id = $6';
            pool.query(sql3, params3, (err, result3) => {
                if(err){
                    console.log("An error with the database has occurred while editing the Events");
                    console.log(err);
                }
                cb();
            });
        } else {
            const params4 = [event.eventName, event.startDate, event.id];
            const sql4 = 'UPDATE Calendar SET event_name = $1, start_date = $2 WHERE id = $3';
            pool.query(sql4, params4, (err, result4) => {
                if(err){
                    console.log("An error with the database has occurred while editing the Events");
                    console.log(err);
                }
                cb();
            });
        }
    }, callback);
}
 
//***************Delete Event***********************/
const deleteEvent = (id, callback) => {
    const sql = "DELETE FROM Calendar WHERE id ='" + id + "'";
    pool.query(sql, (err, result) => {
        if(err) {
            console.log('A database Error has occurred while deleting and entry from Calendar');
            console.log(err);
        }
        callback();
    });
}

//****************User************************/
//***************Create User***********************/
const createUser = (userName, password) => {
    const sql = 'INSERT INTO Login(user_name, password) VALUES ($1, $2)'
    const params = [userName, password];
    pool.query(sql, params, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred");
			return console.log(err);
        }
    });
}

//***************Get Hash***********************/
const getHash = (userName, callback) => {
    const sql = "SELECT password FROM Login WHERE user_name = '" + userName + "'";
    pool.query(sql, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred while finding the user");
			return console.log(err);
        }
        callback(null, result.rows);
    });
}

const getUser = (userName, callback) => {
    const sql = "SELECT * FROM Login WHERE user_name = '" + userName + "'";
    pool.query(sql, (err, result) => {
        if(err) {
			console.log("An error with the database has occurred while finding the user");
			return console.log(err);
        }
        callback(null, result.rows);
    });
}

module.exports = {
    getStockDropdown,
    getStock,
    addStock,
    removeStock,
    updateStock,
    getUpdates,
    updateDropdown,
    addUpdates,
    deleteUpdate,
    editUpdates,
    getEvents,
    addEvent,
    editEvents,
    deleteEvent,
    getEditEvents,
    createUser,
    getHash,
    getUser
}