/**
 * Middleware for error manipulation.
 */
import config from 'src/app/config';
import chalk from 'chalk';
import { ILogError } from 'src/app/interfaces';
import { log_errors_model } from 'src/app/models';


class Err {

  static obj() {
    return new this();
  }


  /**
   * Convert error to JSON and send formatted error to client.
   */
  private send2client(err, res): void {
    const status = err.status || 500;
    res.status(status);

    const jdata = {
      status,
      message: err.message,
      stack: err.stack
    };
    res.json(jdata);
  }


  /**
   * Insert error to 'log_errors' collection
   */
  private send2mongo(err, req, next): void {
    let user_id;
    let user_role;
    if (!!req.user) {
      user_id = req.user._id;
      user_role = req.user.role;
    } else {
      user_id = null;
      user_role = '';
    }

    const endpoint = req.method  + ' ' + req.protocol + '://' + req.get('host') + req.originalUrl;

    const errDoc: ILogError = {
      user_id,
      user_role,
      status: err.status || 500,
      level: err.level || 'error',
      category: err.category || 'uugotit-spyder3',
      message: err.message,
      stack: err.stack,
      endpoint,
      ip: req.client.ip,
      time: Date.now()
    };

    log_errors_model.add(errDoc)
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }



  sender = (err, req, res, next) => {
    // output to console (only in development environment)
    if (config.env.name !== 'production') {
      console.log(chalk.red(err.stack));
      console.log(chalk.magenta(JSON.stringify(err, null, 4)));
    }

    /*** OUTPUT ***/
    this.send2mongo(err, req, next);
    this.send2client(err, res);
  }


  /* report error 404 on bad /api/... URLs*/
  badAPIurl = (req, res) => {
    const jdata = {
        status: 404,
        message: 'Error 404: Url ' + req.url + ' not found'
      };
    res.status(404).json(jdata);
  }


  // catch all uncaught exceptions
  uncaught() {
    process.on('uncaughtException', (err: Error) => {
      console.error(chalk.red(err.toString())); // output to console
    });
  }

}

export default Err;
