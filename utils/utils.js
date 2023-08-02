var crypto = require('crypto');
const generateHash = (stringData) => crypto.createHash('sha256').update(stringData).digest('hex')

module.exports = {
generateHash
}