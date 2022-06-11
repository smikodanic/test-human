/**
 * Morgan HTTP request logger
 * https://github.com/expressjs/morgan
 */

import * as morgan from 'morgan';


class LoggerMorgan {

  static obj() {
    return new this();
  }

  logDev(app, config) {
    // log every request to the console (works only when NODE_ENV=dev)
    if (config.env.name === 'dev' || config.env.name === 'stage') {
      app.use(morgan('dev'));
    }
  }

}


export default LoggerMorgan;
