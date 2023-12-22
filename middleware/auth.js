const jwt = require('jsonwebtoken');
var httpContext = require('express-http-context');
module.exports = async (req, res, next) => {
    console.log("req.header('Authorization')", req.header('Authorization'))
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(403).json({ message: 'Access denied. No token provided.' });
    const [bearer, token] = authHeader.split(' ');
    jwt.verify(token, process.env.secretKey, async(err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = decoded;
        console.log("reqqqqqqq", decoded);
       await httpContext.set('Loggedinuser', req.user)
        console.log("httpContext.get('Loggedinuser')", httpContext.get)
        next();
    });
}