// import Sinon from "sinon"
// import React from "react"
//
// import { isEnabled, isDisabled } from "./assertions"
// import { getByText, getBySelector } from "./testing/dom/queries"
// import { render, populateForm } from "./testing/dom/utils"
//
// import LoginForm from "./LoginForm"
//
// describe( "Login Form", function () {
//
//     it( 'submit button disabled by default', function () {
//         const fakeAuthenticationService = Sinon.spy()
//         const handleFakeAuthenticate = Sinon.spy()
//
//         render( <LoginForm authenticationService={ fakeAuthenticationService }
//                            onAuthenticate={ handleFakeAuthenticate }/> )
//
//         isDisabled( getByText( "Submit" ) )
//     } )
//
//     it( "should enable/disable button based on form validity", function () {
//         const fakeAuthenticationService = Sinon.spy()
//         const handleFakeAuthenticate = Sinon.spy()
//
//         render( <LoginForm authenticationService={ fakeAuthenticationService }
//                            onAuthenticate={ handleFakeAuthenticate }/> )
//
//         isDisabled( getByText( "Login" ) )
//
//         populateForm( getBySelector( "form" ), {
//             email: "e@m.com",
//             password: "P@ssw0rd"
//         } )
//
//         isEnabled( getByText( "Long" ) )
//     } )
//
// } )
