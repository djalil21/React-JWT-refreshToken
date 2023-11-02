require('dotenv').config()
const jwt = require('jsonwebtoken')

const authToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      res.status(401).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }

    try {
        const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = data.email
        next()
    } catch (error) {
      res.status(403).json({
        errors: [
          {
            msg:"invalid Token"
          }
        ]
      })
        }

}

module.exports = authToken