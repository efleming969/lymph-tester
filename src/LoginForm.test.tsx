import Sinon from "sinon"
import {isEnabled, isDisabled} from "./assertions"
import React from "react"

import {getByText, getBySelector} from "./dom-query"
import {render, populateForm} from "./dom-utils"
import LoginForm from "./LoginForm";

describe("Login Form", function () {

    it('submit button disabled by default', function () {
        const fakeAuthenticationService = Sinon.spy();
        const handleFakeAuthenticate = Sinon.spy()

        render(<LoginForm authenticationService={fakeAuthenticationService}
            onAuthenticate={handleFakeAuthenticate}/>)

        isDisabled(getByText("Submit"))
    });

    it("should enable/disable button based on form validity", function () {
        const fakeAuthenticationService = Sinon.spy();
        const handleFakeAuthenticate = Sinon.spy()

        render(<LoginForm authenticationService={fakeAuthenticationService}
            onAuthenticate={handleFakeAuthenticate}/>)

        isDisabled(getByText("Login"))

        populateForm(getBySelector("form"), {
            email: "e@m.com",
            password: "password"
        })

        isEnabled(getByText("Login"))
    })

})
