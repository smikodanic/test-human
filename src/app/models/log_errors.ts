// bluebird promisification
import * as mongoose from 'mongoose';
import * as BPromise from 'bluebird';

const mongooseP = BPromise.promisifyAll(mongoose);
mongooseP.Promise = BPromise; // Prevent error: "mpromise (mongoose's default promise library) is deprecated"

// define models
import Sch from './schema/LogErrors';
const log_errorsModel = mongooseP.model('log_errorsMD', Sch);



/*** Common methods ***/
import CommonMethods from './commonMethods';




/*** Specific methods ***/
class LogErrors extends CommonMethods {

  constructor() {
    super(log_errorsModel);
  }

}


const log_errors_model = new LogErrors();
export { log_errors_model };
