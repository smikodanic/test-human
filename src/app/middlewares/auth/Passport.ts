/**
 * PassportJS authentication middleware
 * COMMON MIDDLEWARE
 * This is required to passport work properly.
 * http://passportjs.org/docs
 *
 * No sessions according to REST constraints described at http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm .
 * RESTFull API must be stateless.
 */

import * as passport from 'passport';
import StrategyJWT from './StrategyJWT';



class Passport {

  static obj() {
    return new this();
  }

  init(app) {
    app.use(passport.initialize()); // initialize passport module
    return this;
  }

  jwt() {
    StrategyJWT.obj().defineStrategy4users();
  }

}


export default Passport;
