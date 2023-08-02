// define middleware
const fs = require("fs");
const utils = require("./utils/utils");
const auth = require("./auth/jwt");

const DB_PATH = __dirname + "/db/users.json";

const loggerMiddleware = (req, res, next) => {
  console.log(`API Endpoint Request: ${req.path} at ${new Date()}`);
  next();
};

const authenticateUser = (req, res, next) => {
  let userDB = JSON.parse(fs.readFileSync(DB_PATH));

  const username = req.body.username;
  const password = utils.generateHash(req.body.password);
  console.log(`Attempting to login user..... : ${username}`)
  if (username in userDB) {
    if (password === userDB[username].password) {
      return next();
    }
  }
  res.status(401).send("Unauthorized");
};

const validateToken = (req, res, next) => {
  if (!("authorization" in req.headers)){
    res.status(401).send(`Need Valid Token to access API`);
  }
  
  try {
    const auth_header = req.headers.authorization.split(" ")[1];
    userId = auth.verifyToken(auth_header);
    req.body["user"] = userId
    next();
  } catch (e) {
    console.log(`Error : ${e}`);
    res.status(401).send(`Error : ${e.message}`);
  }
};

module.exports = {
  loggerMiddleware,
  authenticateUser,
  validateToken,
};
