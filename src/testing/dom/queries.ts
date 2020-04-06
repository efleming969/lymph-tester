export const getByText = function ( text, context:Node = document ): HTMLElement {
    return document.evaluate( `//*[contains(text(), '${ text }')]`, context, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue as HTMLElement
}

export const getByTestId = function ( id ): HTMLElement {
    return document.querySelector( `[data-testid=${ id }]` )
}

export const getBySelector = function ( selector ): HTMLElement {
    return document.querySelector( selector )
}

export const queryBySelector = function ( selector ): NodeListOf<any> {
    return document.querySelectorAll( selector )
}
