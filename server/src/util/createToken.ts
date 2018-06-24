const jwt = require('jsonwebtoken')
export = function (name){
    const token = jwt.sign({
        name:name,
        createTime:Date.now()
    },process.env.JWT_SECRET,{ expiresIn: '1 day' })
    return token;
  }
