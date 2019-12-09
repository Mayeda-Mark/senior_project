const redirectHome = (req, res, next) => {
    if( req.session.userId) {
        res.redirect('/editHome');
    } else {
        next();
    }
}