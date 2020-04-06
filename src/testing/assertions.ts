import { assert } from "chai"

const arrayIndex = index => `[${ index }]`
const objectProperty = prop => `.${ prop }`
const isObject = value => typeof value === "object" && value !== null && !Array.isArray( value )

// TODO: refactor for readability
const diffArrays = function ( before, after, context ) {
    return [
        ...before
            .slice( 0, Math.min( before.length, after.length ) )
            .reduce(
                ( diffs, nextBefore, i ) =>
                    diffs.concat( diff( nextBefore, after[ i ], context.concat( arrayIndex( i ) ) ) ),
                []
            ),
        ...before.slice( after.length ).map( ( removed, i ) => ({
            removed,
            context: context.concat( arrayIndex( after.length + i ) )
        }) ),
        ...after.slice( before.length ).map( ( added, i ) => ({
            added,
            context: context.concat( arrayIndex( before.length + i ) )
        }) )
    ]
}

// TODO: refactor for readability
const diffObjects = function ( before, after, context ) {
    const beforeProps = Object.keys( before )
    const afterProps = Object.keys( after )
    return [
        ...beforeProps
            .slice( 0, Math.min( beforeProps.length, afterProps.length ) )
            .reduce(
                ( diffs, prop ) =>
                    diffs.concat(
                        diff(
                            before[ prop ],
                            after[ prop ],
                            context.concat( context.length ? objectProperty( prop ) : prop )
                        )
                    ),
                []
            ),
        ...beforeProps.slice( afterProps.length ).map( ( prop, i ) => ({
            removed: before[ prop ],
            context: context.concat( context.length ? objectProperty( prop ) : prop )
        }) ),
        ...afterProps.slice( beforeProps.length ).map( ( prop, i ) => ({
            added: after[ prop ],
            context: context.concat( context.length ? objectProperty( prop ) : prop )
        }) )
    ]
}

const moveDecimalForCompare = ( value ) =>
    value < Number.EPSILON
        ? value
        : value / Math.pow( 10, Math.ceil( Math.log10( value ) ) )

export const diff = function ( before, after, context = [] ) {
    if ( after === before ) {
        return []
    }
    if (
        typeof before === "number" &&
        typeof after === "number" &&
        Math.abs( moveDecimalForCompare( before ) - moveDecimalForCompare( after ) ) <
        Number.EPSILON
    ) {
        return []
    }
    if ( Array.isArray( before ) && Array.isArray( after ) ) {
        return diffArrays( before, after, context )
    }
    if ( isObject( before ) && isObject( after ) ) {
        return diffObjects( before, after, context )
    }
    return [ { before, after, context } ]
}

export const that = function ( bool, message ) {
    if ( bool !== true )
        throw { message }
    else
        return null
}

export const equal = function ( actual, expected ) {
    const diffResult = diff( actual, expected )
    if ( diffResult.length > 0 ) {
        const error = new Error( `${ actual } was not equal to ${ expected }` )
        error[ "actual" ] = actual
        error[ "expected" ] = expected
        throw error
    }

    return null
}

export const same = function ( actual, expected ) {
    if ( actual !== expected )
        throw { message: "not the same", actual, expected }
}

export const match = function ( actual, expected ) {
    const matches = actual.match( expected )

    if ( matches === null )
        throw { message: "match not found", actual, expected }
}

export const isDisabled = function ( element ) {
    that( element.disabled === true, `was NOT disabled` )
}

export const isEnabled = function ( element ) {
    that( element.disabled === false, `was NOT enabled` )
}

export const hasValue = function ( element, expected ) {
    that( element[ "value" ] === expected, `${ element[ "value" ] } was not ${ expected }` )
}

export const hasText = function ( element, expected ) {
    equal( element.textContent, expected )
}

export const Mock = function ( stub = () => null ) {
    let called

    const fn = function ( ...args ) {
        called = args
        return stub()
    }

    fn.wasCalled = function () {
        if ( !called ) {
            throw new Error( `${ fn.name } was not called` )
        }
    }

    fn.wasCalledWith = function ( ...args ) {
        if ( diff( called, args ).length > 0 ) {
            const error = new Error( `${ fn.name } was not called with` )
            error[ "actual" ] = called
            error[ "expected" ] = args
            throw error
        }
    }

    return fn
}

