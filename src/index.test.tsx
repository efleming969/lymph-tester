import { expect } from "chai"
import Sinon from "sinon"
import { isEnabled, isDisabled } from "./assertions"
import React from "react"

import { getByTestId, getByText, getBySelector } from "./dom-query"
import { render, click, clickByText, populateForm } from "./dom-utils"

import Main from "./Main"
import Header from "./Header"
import SimpleForm from "./SimpleForm"

describe( "index", function () {

    it( "should render component", function () {
        render( <Main/> )

        const message = getByTestId( "message" ).textContent

        expect( message ).to.equal( "whatup" )
    } )

    it( "should notify parent when clicking logout", function () {
        const onLogout = Sinon.spy()

        render( <Header onLogout={ onLogout }/> )

        clickByText( "Logout" )

        expect( onLogout.called ).to.be.true
    } )

    it( "should find an element by css selector", function () {
        render( <Main/> )

        const messageContainer = getBySelector( "h1" )

        expect( messageContainer.textContent ).to.equal( "Hello, World" )
    } )

    it( "should populate a form based on names", function () {
        const onSubmitted = Sinon.spy()

        render( <SimpleForm onSubmitted={ onSubmitted }/> )

        populateForm( getBySelector( "form" ), {
            email: "e@m.com",
            password: "password"
        } )

        click( getByText( "Submit" ) )

        expect( onSubmitted.calledWith( {
            email: "e@m.com", password: "password"
        } ) ).to.be.true
    } )

    it( "should enable button when form is valid", function () {
        const onSubmitted = Sinon.spy()

        render( <SimpleForm onSubmitted={ onSubmitted }/> )

        isDisabled( getByText( "Submit" ) )

        populateForm( getBySelector( "form" ), {
            email: "e@m.com",
            password: "password"
        } )

        isEnabled( getByText( "Submit" ) )
    } )
} )
