const fs = require("fs");
const DB_PATH = __dirname + "/../db/users.json";

// Caller should Make sure password should be in SHA256 hash form
const createUser = (username, password) => {
  console.log(`Attempting to create user..... : ${username}`)
  if (!isUserExists(username)) {
    let userDB = JSON.parse(fs.readFileSync(DB_PATH));
    let userEntry = {
      username,
      password,
    };
    userDB[username] = userEntry;
    fs.writeFileSync(DB_PATH, JSON.stringify(userDB));
    
    return true
  } else {
    return false
  }
};

const isUserExists = (username) => {
  let userDB = JSON.parse(fs.readFileSync(DB_PATH));
  return username in userDB ? true : false;
};

module.exports = {
    createUser
}
