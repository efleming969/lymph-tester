import Logger from "./logger"

const filterIsolated = function ( thingsWithName ) {
    const isolatedThings = thingsWithName.filter( s => s.name.startsWith( "i:" ) )
    return isolatedThings.length > 0 ? isolatedThings : thingsWithName
}

const runSuite = async function ( suite ) {
    const suiteResults = []
    let suiteHasErrors = false

    for ( let context of suite.contexts ) {
        const givenToRun = filterIsolated( context.listOfGiven )

        for ( let given of givenToRun ) {
            const givenResults = []
            let givenHasErrors = false

            for ( let beforeEach of context.listOfBeforeEach ) {
                await beforeEach()
            }

            for ( let test of given.tests ) {
                const itToRun = filterIsolated( test.listOfIt )

                for ( let it of itToRun ) {
                    try {
                        for ( let beforeEach of test.listOfBeforeEach ) {
                            await beforeEach()
                        }

                        await it.runTest()

                        givenResults.push( { name: it.name } )
                    } catch ( error ) {
                        givenResults.push( { name: it.name, error } )
                        givenHasErrors = true
                        suiteHasErrors = true
                    }
                }
            }

            suiteResults.push( {
                name: given.name,
                results: givenResults,
                hasErrors: givenHasErrors
            } )
        }
    }

    return {
        name: suite.name,
        results: suiteResults,
        hasErrors: suiteHasErrors,
    }
}

function logSuiteResults( suiteResults ) {
    const failures = []

    for ( let suiteResult of suiteResults.results ) {
        Logger.group( suiteResult.name )

        for ( let contextResult of suiteResult.results ) {
            if ( contextResult.error ) {
                Logger.logRed( contextResult.name )
                failures.push( contextResult )
            } else {
                Logger.logGreen( contextResult.name )
            }
        }

        Logger.groupEnd()
    }

    return failures
}

export const runSuites = async function ( suites ) {
    const suitesToRun = filterIsolated( suites )
    let failures = []

    Logger.group( "Suites" )
    for ( let suite of suitesToRun ) {
        Logger.group( suite.name )
        const results = await runSuite( suite )

        failures = [ ...failures, ...logSuiteResults( results ) ]
        Logger.groupEnd()
    }
    Logger.groupEnd()

    Logger.group( "Failures" )
    for ( let failure of failures ) {
        Logger.groupRed( failure.name )
        Logger.log( failure.error )
        Logger.log( failure.error.actual, failure.error.expected )
        Logger.groupEnd()
    }
    Logger.groupEnd()
}

