import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

CategorySchema.index({ '$**': 'text' });
export default mongoose.model('category', CategorySchema);
