/**
 * Methods common for all models.
 */

class CommonMethods {

  modelCommon: any;

  constructor(modelCommon) {
    this.modelCommon = modelCommon;
  }


  static obj(mdlCommon) {
    return new this(mdlCommon);
  }


  // add new doc
  add(doc) {
    return this.modelCommon.createAsync(doc);
  }


  // save() method or Bluebird's saveAsync()
  save(docObj) {
    const doc = new this.modelCommon(docObj);
    return doc.saveAsync();
  }


  // count and list docs for 'moQuery'
  list(moQuery, limit, skip, sort) {
    return this.modelCommon
      .countAsync(moQuery)
      .then(resultsNum => {
        return this.modelCommon
          .find(moQuery)
          .limit(limit)
          .skip(skip)
          .sort(sort)
          .execAsync()
          .then(resultsArr => {
            const results = {
              success: true,
              count: resultsNum,
              data: resultsArr
            };
            return results;
          });
      });
  }


  // delete one doc
  deleteOne(moQuery) {
    return this.modelCommon.findOneAndRemoveAsync(moQuery);
  }


  // get doc
  getOne(moQuery, sort?) {
    return this.modelCommon
      .findOne(moQuery)
      .sort(sort)
      .execAsync();
  }


  // update a doc
  editOne(moQuery, docNew, updOpts?) {
    return this.modelCommon.findOneAndUpdateAsync(moQuery, docNew, updOpts);
  }


}



export default CommonMethods;
