import React, { useState } from "react"

import suite from "../testing/suite"
import { equal, hasText, Mock } from "../testing/assertions"
import { render, clickByText, click } from "../testing/dom/utils"
import { getByTestId, getByText } from "../testing/dom/queries"

const SimpleComponent = function ( { fetchData, onCompleted } ) {
    const [ message, setMessage ] = useState( "Hello, World!" )

    const handleClick = async function () {
        await fetchData( { email: "e@m.com" } )
        setMessage( "Hello, Universe!" )
        onCompleted( { email: "e@m.com" } )
    }

    return <div>
        <h1 data-testid="message">{ message }</h1>
        <input/>
        <button onClick={ handleClick } data-testid="clicker">Click Here</button>
    </div>
}

export default suite( "context tests", function ( { given } ) {
    given( "simple component", function ( { it } ) {

        it( "can render", async function () {
            const mockFetchData = Mock( () => Promise.resolve( null ) )
            const mockOnCompleted = Mock()

            render( <SimpleComponent
                fetchData={ mockFetchData }
                onCompleted={ mockOnCompleted }
            /> )

            const button = getByTestId( "clicker" )
            const message = getByTestId( "message" )

            hasText( message, "Hello, World!" )

            await click( button )

            hasText( message, "Hello, Universe!" )

            mockOnCompleted.wasCalledWith( { email: "e@m.com" } )
        } )

    } )

} )

