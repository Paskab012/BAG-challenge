/* eslint-disable no-empty */
/* eslint-disable no-nested-ternary */
import mongoose from 'mongoose';
import config from 'config';

const db = process.env.NODE_ENV === 'development'
  ? config.get('mongoURI_DEV')
  : process.env.NODE_ENV === 'production'
    ? config.get('MONGO_URI')
    : config.get('mongoURI_TEST');

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
