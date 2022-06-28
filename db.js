const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;

console.log(connectionString);

async function connectDb() {
  try {
    await mongoose.connect(connectionString);
    console.log('connected to DB successfuly');
  } catch (e) {
    process.exit(1);
  }
}

connectDb();
