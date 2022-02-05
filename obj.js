const user = {
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(value).trim().toLowerCase());
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
  verifyToken: {
    type: String,
    default: randomUUID(),
    required: [true, 'Verify token is required'],
  },
  refreshToken: {
    type: String,
  },
  Proceeds: {
    type: Number,
    default: 0,
  },
};

// Proceeds: {
//     permanent {
//       my
//       partner
//     },
//     supplementary {
//       my
//       partner
//     }
// }

const transactions = {
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  data: {
    type: String,
  },
};
