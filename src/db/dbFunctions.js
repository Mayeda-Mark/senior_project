const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://shrrdpdlinqgpf:27ffb3fc195dd896f00335db1c2b4fcbe229c23a3255cd1e5dcec86373faa3ee@ec2-54-235-180-123.compute-1.amazonaws.com:5432/defe8vag2516cd?ssl=true';
const pool = new Pool({connectionString: connectionString});


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

//**************Stock Dropdown***********************/
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

//****************Add Stock***********************/
const addStock = (itemName, itemDescription, price, quantity) => {
    var params = [itemName, itemDescription, price, quantity];
    const sql = 'INSERT INTO Stock (product_name, description, price, inventory) VALUES($1, $2, $3, $4) RETURNING *;';
    pool.query(sql, params, (err,result) => {
        console.log("An error with the database has occurred while adding an item to the stock");
        console.log(err);
    });
    console.log('Stock added');
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
const updateStock = (itemName, itemDescription, price, quantity) => {
    var i = 0;
    var nameArray = Array(itemName);
    // var descriptionArray = Array(itemDescription);
    // var priceArray = Array(price);
    // var quantityArray = Array(quantity);
    nameArray.forEach(name => {
        console.log(name.length);
        if(name.length > 1) {
        var paramItemName = name[i];
        // var paramDescription = descriptionArray[i];
        var paramDescription = itemDescription[i];
        var paramPrice = price[i];
        // var paramPrice = priceArray[i];
        var paramQuantity = Number(quantity[i]);
        // var paramQuantity = Number(quantityArray[i]);
        var params = [paramItemName, paramDescription, paramPrice, paramQuantity];
        // console.log(i);        
        console.log(paramDescription);

        }
        else {
            var params = [name, itemDescription, price, quantity];
        }

        console.log(paramPrice);
        const sql = 'UPDATE Stock SET product_name = $1, description = $2, price = $3, inventory = $4 WHERE product_name = $1';
        if(paramQuantity <= 0){
            return removeStock(paramItemName);
        }
        pool.query(sql, params, (err,result) => {
            console.log("An error with the database has occurred while editing the stock");
            console.log(err);
        });
        i++;
    });
    // if(itemName.length > 1){
    //     for(i = 0; i < itemName.length; i++) {
    //         var paramItemName = itemName[i];
    //         var paramDescription = itemDescription[i];
    //         var paramPrice = price[i];
    //         var paramQuantity = Number(quantity[i]);
    //         var params = [paramItemName, paramDescription, paramPrice, paramQuantity];
    //         const sql = 'UPDATE Stock SET product_name = $1, description = $2, price = $3, inventory = $4 WHERE product_name = $1';
    //         if(paramQuantity <= 0){
    //             return removeStock(paramItemName);
    //         }
    //         pool.query(sql, params, (err,result) => {
    //             console.log("An error with the database has occurred while editing the stock");
    //             console.log(err);
    //         });
    //     } 
    //     console.log(itemName[i]);
    //     }
    //     else {
    //         console.log('else is firing');
    //         var paramItemName = itemName;
    //         var paramDescription = itemDescription;
    //         var paramPrice = price;
    //         var paramQuantity = Number(quantity);
    //         var params = [paramItemName, paramDescription, paramPrice, paramQuantity];
    //         const sql = 'UPDATE Stock SET product_name = $1, description = $2, price = $3, inventory = $4 WHERE product_name = $1';
    //         if(paramQuantity <= 0){
    //             return removeStock(paramItemName);
    //         }
    //         pool.query(sql, params, (err,result) => {
    //             console.log("An error with the database has occurred while editing the stock");
    //             console.log(err);
    //         });
    //     }
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


//**************Add/Edit Updates***********************/
const addEditUpdates = (title, date, update_text) => {
    const params1 = [title];
    const params2 = [title, date, update_text];
    const sql1 = 'SELECT * FROM Updates WHERE Title = $1';
    const sql2 = 'INSERT INTO Updates (Title, Date, Update_text) VALUES ($1, $2, $3) RETURNING *';
    pool.query(sql1, params1, (err, result1) => {
        if(err) {
			console.log("An error with the database has occurred");
			return console.log(err);
        }
        if(result1.rowCount == 0) {
            pool.query(sql2, params2, (err, result2) => {
                console.log("An error with the database has occurred");
                return console.log(err);
            });
            console.log('Udate added');
        }
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
    addEditUpdates
}