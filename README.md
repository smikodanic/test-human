# test-human
The test API.


## Characteristics
- typescript
- webpack
- nodejs, expressjs, mongodb
- mongoose
- passportJS - JWT authhentication is integrated in API rutes
- protect API endpoint with JWT authentication
- protect API enpoints from unauthorized access (user roles)
- two user roles: admin & customer
- built in endpoints: user registration, user login, customer test endpoint, admin test endpoint
- built in CORS HTTP headers
- built in client IP getter
- error handling (error logger, console output, uncaught errors)


## Installation
```bash
- run in first terminal
$ git clone git@github.com:smikodanic/human-test.git
$ npm install
$ npm run dev

- run in another terminal
$ npm run serve
```


## Ports & Environments
- development: 9988
- production: 9987


## Built-in Endpoints
- **GET /api**  --API general info
- **POST /api/register**  --register new user
- **POST /api/login**  --user login which returns JWT token
- **GET /api/loggedinfo**  --logged user info
- **GET /api/customer/test**  --customer endpoint test
- **GET /api/admin/test**  --admin endpoint test
