import Suite from "../testing/suite"
import { equal } from "../testing/assertions"

const timeout = function () {
    return new Promise( function ( resolve ) {
        setTimeout( function () {
            resolve( "thing1" )
        } )
    } )
}

export default Suite( "asynchronous tests", function ( { given } ) {

    given( "default", function ( { it } ) {

        it( "async 1", function () {
            return new Promise( function ( resolve, reject ) {
                setTimeout( function () {
                    try {
                        equal( "thing", "thing2" )
                    } catch ( error ) {
                        reject( error )
                    }
                    resolve()
                } )
            } )
        } )

        it( "async 2", async function () {
            const x = await timeout()

            equal( x, "async 2" )
        } )

        it( "async 3", function () {
            return new Promise( function ( resolve ) {
                setTimeout( function () {
                    resolve()
                } )
            } )
        } )
    } )
} )

