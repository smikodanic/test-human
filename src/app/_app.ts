import * as express from 'express';
import * as path from 'path';
import config from './config';
import Passport from './middlewares/auth/Passport';
import BodyParser from './middlewares/BodyParser';
import Cors from './middlewares/Cors';
import Err from './middlewares/Err';
import Logger_morgan from './middlewares/LoggerMorgan';
import MongooseDriver from './middlewares/mongodb/MongooseDriver';
import RebuildIndexes from './middlewares/mongodb/RebuildIndexes';
import Request_ip from './middlewares/RequestIp';
import Routes from './routes/_routes';


class App {

  app: express.Application;

  constructor() {
    this.app = express();
    this.run();
  }


  private middlewares() {
    Logger_morgan.obj().logDev(this.app, config);
    BodyParser.obj().parse(this.app);
    MongooseDriver.obj().konektDefault(config.env.mongodb);
    Passport.obj().init(this.app).jwt();

    this.app.use(Request_ip.getIP);
    this.app.use(Cors.solve);
  }


  private routes() {
    this.app.use('/', Routes.obj().defineRoutes());
  }


  private errors() {
    const err = Err.obj();
    this.app.use(err.badAPIurl); // 404 not found middleware. detect only /api/... bad URLs
    this.app.use(err.sender); // send error to client, sentry and mongo
    err.uncaught(); // uncaught exceptions
  }


  private rebuildMongoInd() {
    if (config.env.mongodb.rebuildIndexes) {
      RebuildIndexes.obj().allModels();
    }
  }



  run() {
    this.middlewares();
    this.routes();
    this.errors();
    this.rebuildMongoInd();
    return this.app;
  }

}

export default App;
