const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    
    const { token } = req.headers
    if (!token) return res.status(401).send('No token')    

    try {
        const userInfo = jwt.verify(token, process.env.SECRET_KEY)         
        req.user = userInfo 
    } catch(err) {
        return res.status(401).send('Invalid token')
    }

    next()
}