import * as mongoose from 'mongoose';
import opts from './_options';

const Schema = mongoose.Schema;


// options
opts.collection = 'articles';


// schema definition
const Sch = new Schema({

  title: {type: String, required: 'title is required'},
  slug: {type: String, required: 'slug is required'}

}, opts);



export default Sch;
