import TimeLib from '../lib/TimeLib';
import config from '../config';


class Root {

  static apiData(req, res, next) {

    // get uptime
    const uptime = process.uptime();
    const uptime_human = new TimeLib().secondsToString(uptime);

    const jdata = {
      api: {
        name: config.api_name,
        version: 'v1',
        url: config.env.url,
        environment: config.env.name,
        server: config.env.server
      },
      nodejs: {
        version: process.version,
        platform: process.platform,
        uptime,
        uptime_human
      },
      mongoose: {
        version: require('mongoose').version
      },
      socket_io: {
        // version: require('socket.io/package').version
      },
      client: {
        ip: req.client.ip,
        headers: req.headers,
        body: req.body,
        params: req.params,
        query: req.query
      }
    };

    res.json(jdata);
  }

}


export default Root;
