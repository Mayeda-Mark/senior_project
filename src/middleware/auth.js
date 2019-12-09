const jwt = require('jsonwebtoken');
const db = require('../db/dbFunctions');
//****************************************** */
const JWT_SECRET = 'piesaredeliciousandiwanttoeatthem';
//******************************************* */

const auth = (req, res, next) => {
    // const bearerHeader = req.headers['authorization'];
    // if(typeof bearerHeader !== 'undefined') {
    //     console.log('firing');
    //     const bearer = bearerHeader.split(' ');
    //     const bearerToken = bearer[1];
    //     req.token = bearerToken;
    //     next();
    // } else {
    //     res.status(401).send('Forbidden');
    // }
    if(req.headers['Authorization']) {
    const token = req.header('Authorization').replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).send({ error: 'Please authenticate.'});
                return;
            }
            req.token = decoded;
            next();
        });
    } else {
        res.status(401).send({ error: 'Please authenticate.'});
        return;
    }
}

module.exports = auth;