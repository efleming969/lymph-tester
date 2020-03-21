import React from "react"

export interface FormElement {

}

export interface FormButton extends FormElement {
    type: "submit"
}

export interface InputField extends FormElement {
    label: string;
}

export interface FormProps {
    children: FormElement[]
}

export function Form(props: React.PropsWithChildren<FormProps>) {
    return <form>{props.children}</form>
}

export function InputField(props) {
    return <div>
        <label>{props.label}</label>
        <input type="text" name={props.name}/>
    </div>
}

export function Button(props): FormButton {
    return <button disabled={!props.isValid}>{props.children}</button>
}