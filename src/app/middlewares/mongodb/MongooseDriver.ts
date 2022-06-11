/**
 * Mongoose middleware for mongoDB
 */

import * as mongoose from 'mongoose';
import chalk from 'chalk';
import * as util from 'util';

// options
const timeout = 30 * 1000; // 30 seconds
const connOpts = {
  // useMongoClient: true, // obsolete in 5.x+
  keepAlive: timeout,
  connectTimeoutMS: timeout,
  poolSize: 2,
  useNewUrlParser: true
};


class MongooseDriver {

  static obj() {
    return new this();
  }


  // events
  private onEvent(conn, dbConfig?) {
    // events mongoose.connection or db
    conn.on('error', err => {
      console.error(chalk.red(dbConfig.uri, err, 'readyState:' + conn.readyState));
    });

    conn.on('connected', () => {
      console.log(chalk.blue(dbConfig.uri, '-connected'));
    });

    conn.on('open', () => {
      // console.log(chalk.blue(dbConfig.uri, '-connection open'));
    });

    conn.on('reconnected', () => {
      console.log(chalk.blue(dbConfig.uri, '-connection reconnected'));
    });

    conn.on('disconnected', () => {
      console.warn(chalk.blue(dbConfig.uri, '-connection disconnected'));
    });

    process.on('SIGINT', () => {
      mongoose.disconnect(() => {
        console.log(chalk.blue(dbConfig.uri, '-disconnected on app termination by SIGINT'));
        process.exit(0);
      });
    });
  }


  // make default connection when nodejs app is started (see: server/app/index.js)
  konektDefault(dbConfig) {
    if (!dbConfig.enabled) { return; }

    // establish mongoose connection (use 'mongoose.connection')
    const db = mongoose.connect(dbConfig.uri, connOpts);
    // console.log(util.inspect(db));

    // show events
    this.onEvent(mongoose.connection, dbConfig);
  }


  // create connection on demand
  konekt(dbConfig) {
    // establish mongoose connection (use 'db')
    const db = mongoose.createConnection(dbConfig.uri, connOpts);
    // console.log(util.inspect(db));

    // show events
    this.onEvent(db);

    // close connection if db is not active
    if (!dbConfig.enabled) { db.close(); }

    return db;
  }


  // default schema plugins
  pluginsDefault(schema, pluginOpts) {
    // mongoose.plugin(function (schema. pluginOpts) {
    //  schema.add({datum: Date});
    // });
  }

}


export default MongooseDriver;
