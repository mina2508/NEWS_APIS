const bcrypt = require('bcryptjs');
const UserModel = require('./userModel');
const {
  invalidCredential,
  authenticationError,
} = require('../helpers/customError');
const { jwtVerifyAsync } = require('../helpers/jwtAsync');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) throw invalidCredential;
  const result = await bcrypt.compare(password, user.password);
  if (!result) throw invalidCredential;
  req.body.userId = user._id;
  next();
};
const authorizeUser = async (req, res, next) => {
  const { authorization } = req.cookies;
  if (!authorization) throw authenticationError;
  const payload = await jwtVerifyAsync(authorization, secretKey);
  req.body.userId = payload.userId;
  next();
};

module.exports = { authenticateUser, authorizeUser };
