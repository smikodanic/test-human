/**
 * Get client IP address.
 */
import * as requestIp from 'request-ip';


class RequestIp {

  static getIP(req, res, next) {
    req.client.ip = requestIp.getClientIp(req);
    next();
  }

}

export default RequestIp;
