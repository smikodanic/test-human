import * as express from 'express';
const router = express.Router();
import * as passport from 'passport';


// routes
import Root from './Root';
import { users } from './api/users';

import { customerTest } from './api/customer/test';
import { articles } from './api/customer/articles';

import { adminTest } from './api/admin/test';



class Routes {

  static obj() {
    return new this();
  }


  /* Passport auth middleware (users - admin, operator, cashier) */
  private authCheckUsers() {
    return passport.authenticate('jwt-users', {
      successRedirect: '',
      // failureRedirect: '/examples/auth/passport/badauth',
      failureRedirect: '',
      failWithError: true, // send error as JSON instead of 'unauthorized' string
      failureFlash: false,
      session: false // this must be false
    });
  }


  /**
   * Middleware which allow access for only specific user's role (admin or operator or cashier)
   * @param  roles        - ['admin', 'customer', 'seller']
   * @return Function     - middleware function
   */
  private mustHaveRoles(roles: string[]) {
    return (req, res, next) => {
      if (roles.indexOf(req.user.role) !== -1) {
        next();
      } else {
        next(new Error('Role ' + req.user.role + ' doesn\'t have permission for this endpoint.'));
      }
    };
  }


  defineRoutes() {
    router.get('/', Root.apiData);

    // API routes /api/...
    router.get('/api', Root.apiData);
    router.post('/api/register', users.register);
    router.post('/api/login', users.login);
    router.get('/api/loggedinfo', this.authCheckUsers(), users.loggedinfo);

    // customer
    router.post('/api/customer/articles/addnew', this.authCheckUsers(), articles.addnew);

    // admin
    router.get('/api/admin/test', this.authCheckUsers(), adminTest);


    return router;
  }


}



export default Routes;
