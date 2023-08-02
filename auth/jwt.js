var jwt = require("jsonwebtoken");
const fs = require("fs");
const pvtKey = fs.readFileSync(__dirname + "/jwtRS256.key");
const pubKey = fs.readFileSync(__dirname + "/jwtRS256.key.pub");
const TOKEN_VALIDITY_IN_SEC = 3600

const generateToken = (user) => {
  let payload = {
    exp: Math.floor(Date.now() / 1000) + TOKEN_VALIDITY_IN_SEC,
    user,
  };

  return jwt.sign(payload, pvtKey, { algorithm: "RS256" });
};


const verifyToken = (token) => {
    
    try{
        const decoded = jwt.verify(token, pubKey,{ algorithms: ['RS256'] });
        return decoded.user
    }catch(e){
        throw(e)
    }
};

module.exports = {
    generateToken,
    verifyToken
}
