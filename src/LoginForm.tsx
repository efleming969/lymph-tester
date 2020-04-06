import React, {useRef} from "react"

export const extractFormData = function (form) {
    const fields = {valid: false}
    const elements = form.elements

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]

        const hasTextValue = element.type === "text"
            || element.type === "password"
            || element.type === "textarea"
            || element.type === "email"
            || element.type === "hidden"
            || element.type === "date"
            || element.type === "tel"

        if (element.name) {
            if (hasTextValue) {
                fields[element.name] = element.value
            } else if (element.type === "radio" && element.checked) {
                fields[element.name] = element.value
            } else if (element.type === "checkbox") {
                fields[element.name] = element.checked
            } else if (element.nodeName === "SELECT") {
                fields[element.name] = element.value
            }
        }
    }

    fields.valid = form.checkValidity()

    return fields
}

const useForm = function () {
    const fields = useRef({})

    const register = function (ref) {
    }

    return {
        register: register,
        formState: {isValid: false}
    }
}

const TextField = ({label}) => <div>{label}</div>

export default function LoginForm() {
    const {register, formState} = useForm()

    return <form ref={register}>
        <input name="email" type="email" required/>
        <input name="password" type="password" required/>
        <button type="submit" disabled>Login</button>
    </form>
}
