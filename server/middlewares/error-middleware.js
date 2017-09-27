function errorMiddleware (err, req, res, next) {
    console.error(err);
    if (req.xhr) {
        res.json({err});
    }
    err.code = err.code || 500;
    res.end(`
        <!doctype html>
        <html lang="ru">
            <head>
                <title>Error</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0" />
            </head>
            <body>
                <h1>${err.code} ${err.message}</h1>
                <p>${err.stack || ''}</p>
            </body>
        </html>
    `);
}

module.exports = errorMiddleware;
