export default function ( name, runSuite: ( context ) => void ) {
    const contexts = []

    const createContextBuilder = function ( context ) {

        const given = function ( name, runContext ) {
            const tests = []

            const createTestBuilder = function ( test ) {

                const it = function ( name, runTest ) {
                    test.listOfIt.push( { name, runTest } )
                }

                const beforeEach = function ( fn ) {
                    test.listOfBeforeEach.push( fn )
                }

                return { it, beforeEach }
            }

            const test = { listOfIt: [], listOfBeforeEach: [] }
            tests.push( test )

            const testBuilder = createTestBuilder( test )
            runContext( testBuilder )

            context.listOfGiven.push( { name, tests } )
        }

        const beforeEach = function ( fn ) {
            context.listOfBeforeEach.push( fn )
        }

        return { given, beforeEach }
    }

    const context = { listOfGiven: [], listOfBeforeEach: [] }
    contexts.push( context )

    const contextBuilder = createContextBuilder( context )
    runSuite( contextBuilder )

    return { name, contexts }
}
