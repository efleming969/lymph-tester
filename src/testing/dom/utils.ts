import ReactDom from "react-dom"
import { act } from "react-dom/test-utils"
import { getByText } from "./queries"
import doc = Mocha.reporters.doc

export const changeInput = function ( element, value ) {
    //convoluted solution to change input element
    //due to React overwriting the default value property
    const setter = Object.getOwnPropertyDescriptor( window.HTMLInputElement.prototype, "value" ).set
    setter.call( element, value )

    const changeEvent = new window.Event( "change", {
        bubbles: true,
        cancelable: false
    } )

    act( function () {
        element.dispatchEvent( changeEvent )
    } )
}

export const click = function ( element ) {
    const event = new window.MouseEvent( "click", { bubbles: true } )

    act( function () {
        element.dispatchEvent( event )
    } )
}

export const clickByText = function ( text ) {
    click( getByText( text, document ) )
}

export const populateForm = function ( formElement, fields ) {
    Object.keys( fields ).forEach( function ( fieldName ) {
        const inputElement = formElement.querySelector( `[name=${ fieldName }]` )
        changeInput( inputElement, fields[ fieldName ] )
    } )
}

export const render = function ( component ) {
    const container = document.createElement( "div" )
    document.body.replaceChild( container, document.body.firstChild )

    act( function () {
        ReactDom.render( component, container )
    } )

    return container
}

