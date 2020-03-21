import React, {useState} from "react"
import {extractFormData} from "./LoginForm";

export default function ({onSubmitted}) {
    const [formData, setFormData] = useState({valid: false})

    const handleSubmit = function (e) {
        e.preventDefault()

        const {email, password} = extractFormData(e.target) as any

        onSubmitted({email, password})
    }

    const handleChange = function (e) {
        const {email, password} = extractFormData(e.currentTarget) as any

        const valid = !!(email && email.length > 0 && password && password.length > 0)

        setFormData({valid})
    }

    return <form onSubmit={handleSubmit} onChange={handleChange}>
        <input type="text" name="email"/>
        <input type="password" name="password"/>
        <button disabled={!formData.valid}>Submit</button>
    </form>
}
