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
PUBLIC
- **GET /api**  --API general info
- **POST /api/register**  --register new user, reoles: admin, customer
- **POST /api/login**  --user login which returns JWT token, use this token as JWT Auth. *Authorization: JWT aswa...*
- **GET /api/loggedinfo**  --logged user info

CUSTOMER
- **GET /api/customer/test**  --customer endpoint test
- **POST /api/customer/articles/addnew**  --customer endpoint to add new article (JWT Auth)
- **DELETE /api/customer/articles/:id**  --customer endpoint to delete an article found by _id (JWT Auth) -- http://127.0.0.1:9988/api/customer/articles/62a45d1d7fe45b2f94161bfa
- **GET /api/customer/articles/:id**  --customer endpoint to get the article found by _id (JWT Auth)

ADMIN
- **GET /api/admin/test**  --admin endpoint test
