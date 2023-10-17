const jwt = require('jsonwebtoken');

//create middlewarefor authentication
exports.authenticate = (req: any, res: any, next: any) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, 'secret')
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}