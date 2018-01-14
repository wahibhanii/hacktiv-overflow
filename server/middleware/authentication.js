const jwt = require('jsonwebtoken');

let authentication = (req, res, next) => {
  console.log('masuk auth') 
  jwt.verify(req.headers.token, process.env.JWT_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      res.status(403).json({
        message: 'You don\'t have access!',
        data   : err
      })
    } else {
      console.log(decoded, 'NEXT')
        req.headers.decoded = decoded
        next()
    }
  })
}

module.exports = authentication
