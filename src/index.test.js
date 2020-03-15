import { expect } from "chai";
import ReactDom from "react-dom";
import React from "react";

import { foo } from "./index";
import Main from "./Main";

describe( "index", function() {

    it( "should have a test", function() {
        expect( foo() ).to.deep.equal( { name: "foo" } );
    } );

    it( "should render component", function() {
        ReactDom.render( React.createElement( Main, {}, null ), document.querySelector( "#mocha" ) );
    } );
} );
