import * as http from 'http';
import App from './app/_app';
import config from './app/config';
import Events from './events';

const port = config.env.server.port;
const app = new App().app;


// console.log(http);

// create HTTP server
const HTTPserver = http.createServer(app);
HTTPserver.listen(port);


// server events
HTTPserver.on('error', Events.onError(port));
HTTPserver.on('listening', Events.onListening(HTTPserver));
