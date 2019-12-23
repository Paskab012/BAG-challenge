/* eslint-disable no-empty */
/* eslint-disable no-nested-ternary */
import mongoose from 'mongoose';
import 'dotenv/config';

const db = process.env.NODE_ENV === 'development'
  ? process.env.mongoURI_DEV
  : process.env.NODE_ENV === 'test'
    ? process.env.mongoURI_TEST
    : process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (err) {}
};

export default connectDB;
