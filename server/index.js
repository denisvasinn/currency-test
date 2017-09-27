'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const expressLimiter = require('express-limiter');
const testMiddleware = require('./middlewares/test-middleware');
const indexPageMiddleware = require('./middlewares/index-page-middleware');
const authMiddleware = require('./middlewares/auth-middleware');
const countryMiddleware = require('./middlewares/country-middleware');
const dealMiddleware = require('./middlewares/deal-middleware');
const apiMiddleware = require('./middlewares/api-middleware');
const protectedMiddleware = require('./middlewares/protected-middleware');
const errorMiddleware = require('./middlewares/error-middleware');
const config = require('../config');

mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb://${config.mongo.dbuser}:${config.mongo.dbpassword}@ds143734.mlab.com:43734/currency-test-db`,
    {useMongoClient: true}
)
    .then(() => console.log('Succesfully connected to MongDB'))
    .catch(() => console.error('MongoDB connection error'));

const redisClient = redis.createClient();
const app = express();
const limiter = expressLimiter(app, redisClient);

limiter({
    path: '*',
    method: 'all',
    lookup: 'connection.remoteAddress',
    total: 150,
    expires: 15 * 60 * 1000,
    onRateLimited: (req, res, next) => next({message: 'Too Many Requests', status: 429})
});

app
    .set('env', process.env.NODE_ENV)
    .set('port', process.env.PORT || config.port)
    .use(helmet())
    .use(compression())
    .use(express.static(path.join(__dirname, '../build')))
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())
    .use(session({
        store: new RedisStore({client: redisClient}),
        secret: 'n54cfQ',
        name: 'sessionId',
        saveUninitialized: false,
        resave: true,
        cookie: {
            secure: true,
            httpOnly: true,
            domain: 'localhost',
            path: '/',
            expires: 2 * 60 * 60 * 1000
        }
    }))
    .use('/test', testMiddleware)
    .get('/', indexPageMiddleware)
    .use('/auth', authMiddleware)
    .use('/countries', protectedMiddleware, countryMiddleware)
    .use('/deals', protectedMiddleware, dealMiddleware)
    .use('/api', apiMiddleware)
    .use(errorMiddleware);

const options = {
    key: fs.readFileSync(path.join(__dirname, '../ssl/private.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/public.crt'))
};

https
    .createServer(options, app)
    .listen(
        app.get('port'),
        () => console.log(`Listening in ${app.get('env')} mode on port ${app.get('port')}.`)
    );
