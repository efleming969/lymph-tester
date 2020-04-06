import suite from "../testing/suite"
import { equal } from "../testing/assertions"

export default suite( "context tests", function ( { given, beforeEach } ) {
    let sharedValue

    beforeEach( function () {
        sharedValue = "thing"
        console.log( "before each given" )
    } )

    given( "invalid credentials", function ( { it, beforeEach } ) {
        let value

        beforeEach( function () {
            console.log( "before each it" )
            value = "foo"
        } )

        it( "has a disabled button", function () {
            console.log( "it log 1", sharedValue )
            equal( "foo", value )
        } )

        it( "displays an error message", function () {
            console.log( "it log 2", sharedValue )
            equal( "bar", value )
        } )
    } )

    given( "i:context 2", function ( { it } ) {

        it( "c2t1", function () {
            equal( "foo", "bar" )
        } )

        it( "c2t2", function () {
            equal( { name: "foo" }, { name: "bar" } )
        } )

    } )

} )

