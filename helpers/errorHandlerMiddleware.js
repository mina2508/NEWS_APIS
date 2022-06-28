const errorHandler = (error, req, res, next) => {
  if (!error.code) {
    res.statusCode = 500;
    res.send({ message: 'something went wrong' });
  } else {
    res.statusCode = error.status;
    res.send({ message: error.code });
  }

  return next();
};
module.exports = errorHandler;
