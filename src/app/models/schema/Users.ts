import * as mongoose from 'mongoose';
import opts from './_options';

const Schema = mongoose.Schema;


// options
opts.collection = 'users';


// schema definition
const Sch = new Schema({

  first_name: { type: String, required: 'First name is required' },
  last_name: { type: String, required: 'Last name is required' },
  address: String,
  city: String,
  country: String,

  phone: String,
  email: { type: String, required: 'Email is required.', index: { name: 'email', unique: true } },
  website: String,

  misc: Schema.Types.Mixed,

  username: { type: String, required: 'Username is required', index: { name: 'username', unique: true } },
  password: { type: String, required: 'Password is required' },

  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  is_active: { type: Boolean, default: true },
  jwt_token: String

}, opts);



export default Sch;
