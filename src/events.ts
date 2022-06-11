/**
 * Server events
 */
import chalk from 'chalk';



class Events {

  /**
   * Event listener for HTTP server "error" event.
   */
  static onError(port) {

    // onError callback function for server.on('error', onError);
    const onError = (error) => {

      if (error.syscall !== 'listen') {
        throw error;
      }

      const bind = (typeof port === 'string')
        ? 'Pipe ' + port
        : 'Port ' + port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          console.error(error);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(chalk.red(bind + ' is already in use'));
          process.exit(1);
          break;
        default:
          throw error;
      }
    };

    return onError;
  }



  /**
   * Event listener for HTTP server "listening" event.
   */
  static onListening(server) {
    'use strict';

    // onError callback function for server.on('listening', onListening);
    const onListening = () => {
      const addr = server.address();
      const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;

      console.log(chalk.green('Server started on ' + bind));
    };

    return onListening;
  }


}



export default Events;
