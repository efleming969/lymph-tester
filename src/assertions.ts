import { assert } from "chai"

export const isDisabled = function ( element ) {
    assert( element.disabled === true, `was NOT disabled` )
}

export const isEnabled = function ( element ) {
    assert( element.disabled === false, `was NOT enabled` )
}
