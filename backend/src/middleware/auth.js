const jwt = require('jsonwebtoken');

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from Bearer scheme

    if (!token) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token can't be verified
        req.user = user; // Attach user information to request
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;