'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const config = require('../config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const indexPageMiddleware = require('./middlewares/index-page-middleware');
const authMiddleware = require('./middlewares/auth-middleware');
const errorMiddleware = require('./middlewares/error-middleware');

const options = {
    key: fs.readFileSync(path.join(__dirname, '../ssl/private.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/public.crt'))
};
const app = express();

app
    .set('env', process.env.NODE_ENV)
    .set('port', process.env.PORT || config.port)
    .use(helmet())
    .use(compression())
    .use(express.static(path.join(__dirname, '../build')))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(session({
        store: new MongoStore({url: `mongodb://${config.mongo.dbuser}:${config.mongo.dbpassword}@ds143734.mlab.com:43734/currency-test-db`}),
        secret: 'n54cfQ',
        name: 'sessionId',
        saveUninitialized: false,
        resave: true,
        cookie: {
            secure: true,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            expires: 2 * 60 * 1000
        }
    }))
    .get('/', indexPageMiddleware)
    .use('/auth', authMiddleware)
    .use(errorMiddleware);

https
    .createServer(options, app)
    .listen(
        app.get('port'),
        () => console.log(`Listening in ${app.get('env')} mode on port ${app.get('port')}.`)
    );