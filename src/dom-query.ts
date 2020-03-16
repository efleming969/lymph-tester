export const getByText = function ( text, context = document ): any {
    return document.evaluate( `//*[contains(text(), '${ text }')]`, context, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue
}

export const getByTestId = function ( id ) {
    return document.querySelector( `[data-testid=${ id }]` )
}

export const getBySelector = function ( selector ) {
    return document.querySelector( selector )
}
