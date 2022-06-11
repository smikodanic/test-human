// bluebird promisification
import * as mongoose from 'mongoose';
import * as BPromise from 'bluebird';
import * as jsonpatch from 'fast-json-patch';
import AuthLib from '../lib/AuthLib';

const mongooseP = BPromise.promisifyAll(mongoose);
mongooseP.Promise = BPromise; // Prevent error: "mpromise (mongoose's default promise library) is deprecated"
const authLib = new AuthLib();

// define models
import SchemaUsers from './schema/Users';
const usersModel = mongooseP.model('usersMD', SchemaUsers);



/*** Common methods ***/
import CommonMethods from './commonMethods';




/*** Specific methods ***/
class Users extends CommonMethods {

  constructor() {
    super(usersModel);
  }

  // register new user
  register(doc) {
    doc.password = authLib.strToBase64(doc.password);
    return super.add(doc); // from CommonMethods class
  }


  // check credentials username:password and login
  login(username, password) {

    return usersModel
      .findOne({ username })
      .then((userDoc: any) => {
        let err;
        if (!userDoc) {
          err = new Error('Username does not exists.');
          err.level = 'info';
          throw err;
        }
        console.log(userDoc);

        const passDecoded = authLib.base64ToStr(userDoc.password);
        console.log(passDecoded, password);
        if (passDecoded !== password) {
          err = new Error('Password is not correct.');
          err.level = 'info';
          throw err;
        } else {

          // can't login if user is not activated (approved)
          if (!userDoc.is_active) {
            err = new Error('Your account is not active.');
            err.level = 'info';
            throw err;
          } else {
            return userDoc;
          }

        }
      });
  }


  // patch (modify) 'password'
  patchPassword(username, pass_old, pass_new) {

    return module.exports.login(username, pass_old) // first check if old password is correct
      .then(doc => {

        const patchArr: [any] = [{
          op: 'replace',
          path: '/password',
          value: pass_new
        }];

        // apply patch to doc object
        jsonpatch.applyPatch(doc, patchArr, true);
        const docNew = doc;

        // create new mongoose doc with assigned save() methods
        doc.set(docNew);

        return doc.saveAsync();
      });

  }


}

const users_model = new Users();
export { users_model };
