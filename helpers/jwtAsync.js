const util = require('util');
const jwt = require('jsonwebtoken');
const jwtSignAsync = util.promisify(jwt.sign);
const jwtVerifyAsync = util.promisify(jwt.verify);
module.exports = { jwtSignAsync, jwtVerifyAsync };
