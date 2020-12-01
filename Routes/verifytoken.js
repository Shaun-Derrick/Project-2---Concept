const jwt = require('jsonwebtoken')

//MIDDLEWARE FUNCTION
function auth(req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access Denied')

  //VERIFIES THE TOKEN FROM THE HEADER
  try {
    const verified = jwt.verify(token, process.env.TOKEN)
    req.user = verified
  } catch (err) {
    res.status(400).send('Invalid token')
  }
}
