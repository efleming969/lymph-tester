import React from "react"

import styles from "./Button.module.css"

export default function ( { label, onClick } ) {
    return <button className={ styles.primary } onClick={ onClick }>{ label }</button>
}
