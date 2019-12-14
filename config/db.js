import mongoose from 'mongoose';
import config from 'config';

let db;
if (process.env.NODE_ENV === 'development') {
  db = config.get('mongoURI_DEV');
} else if (process.env.NODE_ENV === 'production') {
  db = config.get('MONGO_URI');
} else {
  db = config.get('mongoURI_TEST');
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('db connected');
  } catch (err) {
    console.log('failure=====', err);
  }
};

export default connectDB;
