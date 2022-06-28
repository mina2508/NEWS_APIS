const express = require('express');
const userRouter = express.Router();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { userAlreadyExist } = require('../helpers/customError');
const { authenticateUser, authorizeUser } = require('./userMiddlewares');
const addValidation = require('./userValidation');
const UserModel = require('./userModel');
const newsRouter = require('../NewsSources/newsRouter');
const { jwtSignAsync } = require('../helpers/jwtAsync');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const saltRounds = 12;
userRouter.use(cookieParser());

//post signup
userRouter.post('/signup', addValidation, async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const checkUserExisted = await UserModel.findOne({ email });
  if (checkUserExisted) throw userAlreadyExist;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    sourceNames: [],
  });
  res.send({ message: 'Account Created Successfully' });
});
//post login

userRouter.post('/login', authenticateUser, async (req, res, next) => {
  const { userId } = req.body;

  const token = await jwtSignAsync(
    {
      userId,
      admin: false,
    },
    secretKey
  );
  res.cookie('authorization', token, { maxAge: 1000000, httpOnly: true });
  res.send({ message: 'logged in successfully' });
});

userRouter.post('/logout', async (req, res, next) => {
  res.clearCookie('authorization');
  res.send({ message: 'logged out successfully' });
});
userRouter.use('/sources', authorizeUser, newsRouter);

module.exports = userRouter;
