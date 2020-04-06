import Express from "express"
import WebpackDevMiddleware from "webpack-dev-middleware"
import Webpack from "webpack"
import Path from "path"
import Puppeteer from "puppeteer"

const port = 8080
const mode = process.argv[ 2 ] || "dev"

const compiler = Webpack( {
    mode: "development",
    entry: Path.join( process.cwd(), "src", "all-lymph-tests.ts" ),
    devtool: "inline-source-map",
    output: {
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [ { loader: "ts-loader" } ]
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { modules: true } }
                ]
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".json" ]
    }
} )

const app = Express()

app.use( WebpackDevMiddleware( compiler, {} ) )

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
` )
} )

const server = app.listen( port, function() {
    console.log( "server started" )
} )

const headless = mode === "ci"
const devtools = mode !== "ci"

Puppeteer.launch( { headless, devtools } ).then( async function( browser ) {
    const [ page ] = await browser.pages()

    await page.goto( "http://localhost:" + port )

    page.on( "console", function( message ) {
        // console.log( message )
        // if ( message._type === "log" && message._text.startsWith( "{\n" ) ) {
        //     const testResults = JSON.parse( message._text )
        //     console.log( testResults.stats )
        //     browser.close().then( function() {
        //         server.close( function() {
        //             process.exit( testResults.failures.length )
        //         } )
        //     } )
        // }
    } )

    if ( mode === "dev" ) {
        compiler.hooks.done.tap( "refresh", async function() {
            await page.reload()
        } )
    }

} )

