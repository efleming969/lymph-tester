import React from "react"
import Suite from "../testing/suite"
import { render } from "../testing/dom/utils"

const Simple = function () {
    return <h1>Hello</h1>
}

export default Suite( "react test", function ( { given } ) {

    given( "default", function ( { it } ) {

        it( "first", function () {
            render( <Simple/> )
        } )

        it( "second", function () {
            render( <Simple/> )
        } )

        it( "third", function () {
            render( <Simple/> )
        } )
    } )
} )
