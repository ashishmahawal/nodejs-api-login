// define middleware
const fs = require('fs')
const utils = require('./utils/utils')
const DB_PATH = __dirname + "/db/users.json";


const loggerMiddleware = (req, res, next) => {
    console.log(`API Endpoint Request: ${req.path} at ${new Date()}`);
    next();
  };
  
  const authenticateUser = (req, res, next) => {
    let userDB = JSON.parse(fs.readFileSync(DB_PATH));

    const username = req.body.username;
    const password = utils.generateHash(req.body.password);
  
    if (username in userDB) {
      if (password === userDB[username].password){
          return next()}
    }
    res.status(401).send("Unauthorized")
  };

  module.exports = {
    loggerMiddleware,
    authenticateUser
  }