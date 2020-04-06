import { assert } from "chai"

export const isDisabled = function ( element ) {
    assert( element.disabled === true, `was NOT disabled` )
}

export const isEnabled = function ( element ) {
    assert( element.disabled === false, `was NOT enabled` )
}

export const hasValue = function ( element, expected ) {
    assert( element[ "value" ] === expected, `${ element[ "value" ] } was not ${ expected }` )
}
