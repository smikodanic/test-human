import * as mongoose from 'mongoose';
import opts from './_options';

const Schema = mongoose.Schema;
opts.collection = 'log_errors';
opts.timestamps = { createdAt: '', updatedAt: '' }; // remove createdAt and updatedAt


// schema definition
const Sch = new Schema({
  user_id: Schema.Types.ObjectId,
  user_role: String, // can be admin, customer
  status: Number, // 200, 404
  category: String, // can be uugotit-spyder3, uugotit-scheduler
  level: {type: String, enum: ['error', 'warning', 'info', 'debug'], default: 'error'},
  message: String,
  stack: String,
  endpoint: String, // POST http://...
  ip: String,
  time: Date
}, opts);


export default Sch;
