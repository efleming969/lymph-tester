import React from "react"
import { assert } from "chai"

import { getBySelector, queryBySelector } from "./testing/dom/queries"
import { changeInput, click, render } from "./testing/dom/utils"

import { hasValue } from "./assertions"
import Autocomplete from "./Autocomplete"
import { classNames } from "./utils"
import { thing1 } from "./Autocomplete.module.css"

describe( "Root Samples", function () {

    const items = [
        { key: "1", text: "apples" },
        { key: "2", text: "oranges" },
        { key: "3", text: "grapes" },
        { key: "4", text: "strawberries" },
        { key: "5", text: "blueberries" }
    ]

    it( "should render component", function () {
        const handleChange = function () {
        }

        render( <div>
            <Autocomplete items={ items } onChange={ handleChange }/>
            <input/>
        </div> )

        changeInput( getBySelector( "input" ), "berries" )

        assert.equal( queryBySelector( "ul > li" ).length, 2 )
    } )

    it( "should put selected value in input", function () {
        const handleChange = function () {
        }

        render( <div>
            <Autocomplete items={ items } onChange={ handleChange }/>
            <input/>
        </div> )

        const inputField = getBySelector( "input" )

        changeInput( inputField, "berries" )

        click( getBySelector( "ul > li" ) )

        hasValue( inputField, "strawberries" )
    } )

    it( "builds class names from css modules", function () {
        assert.deepEqual( classNames( "foo", "bar" ), "foo bar" )
        assert.deepEqual( classNames( { "foo": true }, { "bar": false } ), "foo" )
        assert.deepEqual( classNames( { [ thing1 ]: true } ), "_1liTCXMP1iDD-KheHeeDI7" )
    } )
} )
