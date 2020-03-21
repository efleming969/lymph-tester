import Express from "express";
import WebpackDevMiddleware from "webpack-dev-middleware";
import Webpack from "webpack";
import Path from "path";
import Puppeteer from "puppeteer";

const port = 8080;
const mode = process.argv[2] || "dev";

const compiler = Webpack({
    mode: "development",
    entry: Path.join(process.cwd(), "src", "all-tests.js"),
    devtool: "inline-source-map",
    // devtool: "eval-cheap-source-map",
    // devtool: "cheap-module-eval-source-map",
    output: {
        filename: "index.js"
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.module\.css$/i,
                use: [
                    "style-loader", { loader: "css-loader", options: { modules: true } }
                ]
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json" ]
    }
} );
const app = Express();

app.use( WebpackDevMiddleware( compiler, {} ) );

app.get( "/", function( request, response, next ) {
    response.send( `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Testing</title>
        <script src="index.js"></script>
    </head>
    <body><div id="container"></div></body>
</html>
` );
} );

const server = app.listen(port, function() {
    console.log("server started");
});

Puppeteer.launch({ headless: false, devtools: true }).then(async function(browser) {
    const [ page ] = await browser.pages();

    await page.goto("http://localhost:" + port);

    if (mode === "ci") {
        page.on("console", function(message) {
            if (message._location.url.includes("mocha.js")) {
                const testResults = JSON.parse(message._text);
                console.log(testResults.stats);
                browser.close().then(function() {
                    server.close(function() {
                        process.exit(testResults.failures.length);
                    });
                });
            }
        });
    }

    compiler.hooks.done.tap("refresh", async function() {
        if (mode === "dev") {
            await page.reload();
        }
    });

} );

