// bluebird promisification
import * as mongoose from 'mongoose';
import * as BPromise from 'bluebird';

const mongooseP = BPromise.promisifyAll(mongoose);
mongooseP.Promise = BPromise; // Prevent error: "mpromise (mongoose's default promise library) is deprec

// define models
import SchemaArticles from './schema/Articles';
const articlesModel = mongooseP.model('articlesMD', SchemaArticles);



/*** Common methods ***/
import CommonMethods from './commonMethods';




/*** Specific methods ***/
class Articles extends CommonMethods {

  constructor() {
    super(articlesModel);
  }

  addNew(doc) {
  }

}

const articles_model = new Articles();
export { articles_model };
