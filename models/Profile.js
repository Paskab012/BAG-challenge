import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  paymentInfo: {
    cardNumber: {
      type: String
    },
    expiryDate: {
      type: Date
    },
    cvv: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Profile', ProfileSchema);
