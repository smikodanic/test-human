import chalk from 'chalk';
import * as mongoose from 'mongoose';


class RebuildIndexes {

  static obj() {
    return new this();
  }

  /**
   * Rebuild indexes for one model (collection)
   * @param modelName - for example: usersModel
   */
  oneModel(modelName: any) {
    modelName.collection.dropIndexesAsync()
      .then(() => {
        return modelName.ensureIndexesAsync()
          .catch((err) => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  }



  /**
   * Rebuild indexes for all models (collections)
   */
  allModels() {
    const msgStr = 'NODE_RIND=true - Mongo indexes rebuild for: ';
    console.log(chalk.blue(msgStr, mongoose.modelNames().toString()));

    const modelsArr = mongoose.modelNames();
    /*
    [
      'usersMD',
      'websourcesMD',
      ...
    ]
     */

    modelsArr.forEach(mdl => {
      // console.log(mdl);
      const mm = mongoose.model(mdl) as any;
      mm.collection.dropIndexesAsync()
        .then(() => {
          return mm.ensureIndexesAsync()
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    });

  }




}


export default RebuildIndexes;
