const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // get token from request cookies
    const token = req.cookies.token || '';

    // if no token provided in header, return with access denied
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // verify token and get user id
        const user = jwt.verify(token, process.env.JWT_KEY);

        // set user id in request then go next
        req.user_id = user.user_id;
        next();
    } catch (e) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;