import Suite from "../testing/suite"
import { equal } from "../testing/assertions"

export default Suite( "d1", function ( { given } ) {

    given( "default", function ( { it } ) {

        it( "should be skipped", function () {
            equal( "thing", "skipped" )
        } )

        it( "should pass", function () {
            equal( "thing", "thing2" )
        } )
    } )
} )
