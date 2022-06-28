const express = require('express');
const app = express();
require('express-async-errors');
const userRouter = require('./User/userRouter');
const connectDb = require('./db');
const errorHandler = require('./helpers/errorHandlerMiddleware');
require('dotenv').config();
const port = process.env.PORT;
app.use(express.json());
app.use(['/'], userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
