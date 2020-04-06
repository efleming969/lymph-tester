import React from 'react'

import styles from "./InputField.module.css"

export default function ( { label, disabled = false } ) {
    return (
        <div className={ styles.container }>
            <label htmlFor={ name }>{ label }</label>
            <input id={ name } disabled={ disabled } name={ name } type="text"/>
        </div>
    )
}
