import React from "react"

import styles from "./Main.module.css"

export default function () {
    return <section>
        <h1>Hello, World</h1>
        <div className={ styles.container } data-testid="message">whatup</div>
    </section>
}
