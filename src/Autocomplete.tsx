import React, { useState } from "react"

import styles from "./Autocomplete.module.css"

export default function ( { items, onChange } ) {
    const [ filter, setFilter ] = useState( "" )
    const [ hasFocus, setFocus ] = useState( false )

    const handleChange = function ( event ) {
        setFilter( event.target.value )
    }

    const handleItemClick = function ( event ) {
        const selectedItem = items.find( i => i.key === event.target.dataset.itemid )
        setFilter( selectedItem.text )
        onChange( selectedItem )
    }

    const renderItem = function ( item ) {
        return <li key={ item.key } onClick={ handleItemClick }>
            { item.text }
        </li>
    }

    const filterItem = function ( i ) {
        return new RegExp( `${ filter }` ).test( i.text )
    }

    const handleButtonClick = function () {
        setFocus( true )
    }

    return <div className={ styles.container }>
        <input value={ filter } onChange={ handleChange }
               onFocus={ () => setFocus( true ) }
               onBlur={ () => setFocus( false ) }/>

        <button onClick={ handleButtonClick }>|</button>

        <ul style={ { display: hasFocus ? "block" : "none" } }>{
            items.filter( filterItem ).map( renderItem )
        }</ul>
    </div>
}
