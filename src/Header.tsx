import React from "react"

export default function ( { onLogout } ) {
    const handleLogout = function () {
        onLogout()
    }

    return <header>
        <h1>Hello, World</h1>
        <button data-testid="logout" onClick={ handleLogout }>Logout</button>
    </header>
}
