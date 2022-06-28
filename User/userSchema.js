const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: 'string',
  lastName: 'string',
  email: 'string',
  password: 'string',
  sourceNames: [
    {
      type: String,
    },
  ],
});

module.exports = userSchema;
