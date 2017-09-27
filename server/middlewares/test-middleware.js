const express = require('express');
const router = express.Router();

router.all('/', (req, res, next) => {
    console.log('testMiddleware');
    console.log('req.body: ', req.body);
    console.log('req.session.auth: ', req.session.auth);
    //res.end((req.session.views++).toString());
    next();
});

module.exports = router;
