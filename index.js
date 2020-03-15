import Express from "express";
import WebpackDevMiddleware from "webpack-dev-middleware";
import Webpack from "webpack";
import Path from "path";

const compiler = Webpack( {
    mode: "development",
    entry: Path.join( process.cwd(), "src", "all-tests.js" ),
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
    <body>
        <div id="mocha"></div> 
    </body>
</html>
` );
} );

app.listen( 8080, function() {
    console.log( "server started" );
} );

