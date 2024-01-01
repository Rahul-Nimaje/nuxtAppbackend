const jwt = require('jsonwebtoken');
var httpContext = require('express-http-context');
module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(403).json({ message: 'Access denied. No token provided.' });
    const [bearer, token] = authHeader.split(' ');
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        req.LoggedInUser = decoded;
        if (decoded) {
            httpContext.set('LoggedinUser', req.LoggedInUser)
        }
        next();
    } catch (err) {
        throw new Error(err)
    }
}