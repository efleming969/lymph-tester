require( "mocha/mocha.js" );

mocha.setup( { ui: "bdd", color: false, reporter: "spec" } );

require( "./index.test.tsx" );

window.addEventListener( "DOMContentLoaded", function() {
    mocha.run()
        .on( "test end", function( x ) {
            // console.log( "test ended", x );
        } )
        .on( "fail", function( x ) {
            // console.log( "fail", x );
        } )
        .on( "end", function() {
            console.log( "finished" );
        } );
} );
