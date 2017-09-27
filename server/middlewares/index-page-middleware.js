const html = `
    <!doctype html>
    <html lang="ru">
        <head>
            <title>Currency test</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0" />
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
              integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
              crossorigin="anonymous"
            >
            <link rel="stylesheet" href="client/index-page.css" />
            <script src='https://www.google.com/recaptcha/api.js'></script>
        </head>
        <body>
            <div id="root"></div>
            <script src="client/index-page.js"></script>
        </body>
    </html>
`;

function indexPageMiddleware (req, res) {
    res.status(200).end(html);
}

module.exports = indexPageMiddleware;
