const html = `
    <!doctype html>
    <html lang="ru">
        <head>
            <title>Currency test</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0" />
            <link rel="stylesheet" href="clint/index-page.css" />
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
