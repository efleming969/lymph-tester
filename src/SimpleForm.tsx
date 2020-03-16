import React, { useState } from "react"

const extractFormData = function ( form ) {
    const fields = { valid: false }
    const elements = form.elements

    for ( let i = 0; i < elements.length; i++ ) {
        const element = elements[ i ]

        const is_text_box_like = element.type === "text"
            || element.type === "password"
            || element.type === "textarea"
            || element.type === "email"
            || element.type === "hidden"
            || element.type === "date"
            || element.type === "tel"

        if ( element.name ) {
            if ( is_text_box_like ) {
                fields[ element.name ] = element.value
            } else if ( element.type === "radio" && element.checked ) {
                fields[ element.name ] = element.value
            } else if ( element.type === "checkbox" ) {
                fields[ element.name ] = element.checked
            } else if ( element.nodeName === "SELECT" ) {
                fields[ element.name ] = element.value
            }
        }
    }

    fields.valid = form.checkValidity()

    return fields
}

export default function ( { onSubmitted } ) {
    const [ formData, setFormData ] = useState( { valid: false } )

    const handleSubmit = function ( e ) {
        e.preventDefault()

        const { email, password } = extractFormData( e.target ) as any

        onSubmitted( { email, password } )
    }

    const handleChange = function ( e ) {
        const { email, password } = extractFormData( e.currentTarget ) as any

        const valid = !!(email && email.length > 0 && password && password.length > 0)

        setFormData( { valid } )
    }

    return <form onSubmit={ handleSubmit } onChange={ handleChange }>
        <input type="text" name="email"/>
        <input type="password" name="password"/>
        <button disabled={ !formData.valid }>Submit</button>
    </form>
}
