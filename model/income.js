import pkg from 'mongoose';

const { Schema, model } = pkg;

const incomeSchema = new Schema(
  {
    owner: {
      type: String,
      required: true,
      unique: false,
    },
    date: {
      type: Number,
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const Income = model('income', incomeSchema);

export default Income;
