/**
 * Node.js body parser
 * Enables sending data from form by using POST method.
 * https://www.npmjs.com/package/body-parser
 */

import * as bodyParser from 'body-parser';


class BodyParser {

  static obj() {
    return new this();
  }

  parse(app) {
    // log every request to the console (works only when NODE_ENV=dev)
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  }

}


export default BodyParser;


