function customError(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}
const userAlreadyExist = customError(
  410,
  'User Already Exist ',
  'User Already Exist'
);
const invalidCredential = customError(
  405,
  'Email or Password may be wrong',
  'Email or Password may be wrong'
);
const inputErr = customError(
  422,
  'ERR_ASSERTION',
  'firstName, lastName, password must be at least 8 characters.'
);

const authenticationError = customError(
  405,
  'authentication_ERROR',
  'requires logging in'
);
const notSubscribedSource = customError(
  422,
  'NOTSUBSCRIBED_SOURCENAME',
  'sourceName doesnt Exist in your subscribtions'
);
const userHasNoSubscribtions = customError(
  422,
  'NOSUBSCRIBED-SOURCES',
  'user doesnt have any subscribtions'
);
module.exports = {
  customError,
  userAlreadyExist,
  invalidCredential,
  inputErr,
  authenticationError,
  notSubscribedSource,
  userHasNoSubscribtions,
};
