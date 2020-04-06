const NodeLogger = function () {
    const Reset = "\x1b[0m"
    const Bright = "\x1b[1m"
    const Dim = "\x1b[2m"
    const Underscore = "\x1b[4m"
    const Blink = "\x1b[5m"
    const Reverse = "\x1b[7m"
    const Hidden = "\x1b[8m"

    const FgBlack = "\x1b[30m"
    const FgRed = "\x1b[31m"
    const FgGreen = "\x1b[32m"
    const FgYellow = "\x1b[33m"
    const FgBlue = "\x1b[34m"
    const FgMagenta = "\x1b[35m"
    const FgCyan = "\x1b[36m"
    const FgWhite = "\x1b[37m"

    const BgBlack = "\x1b[40m"
    const BgRed = "\x1b[41m"
    const BgGreen = "\x1b[42m"
    const BgYellow = "\x1b[43m"
    const BgBlue = "\x1b[44m"
    const BgMagenta = "\x1b[45m"
    const BgCyan = "\x1b[46m"
    const BgWhite = "\x1b[47m"

    return {
        group: function ( text ) {
            console.group( text )
        },
        log: function ( ...args ) {
            console.log( ...args )
        },
        logGreen: function ( text, ...args ) {
            console.log( `${ FgGreen }${ text }${ Reset }` )
        },
        logRed: function ( text, ...args ) {
            console.log( `${ FgRed }${ text }${ Reset }` )
        },
        logSkip: function ( text ) {
            console.log( `${ FgYellow }${ text }${ Reset }` )
        },
        groupRed: function ( text, ...args ) {
            console.group( `${ FgRed }${ text }${ Reset }` )
        },
        groupGreen: function ( text, ...args ) {
            console.group( `${ FgGreen }${ text }${ Reset }` )
        },
        groupEnd: function () {
            console.groupEnd()
        }
    }
}

const BrowserLogger = function () {
    return {
        group: function ( text ) {
            console.group( text )
        },
        groupRed: function ( text ) {
            console.group( "%c%s", "color:salmon", text )
        },
        groupGreen: function ( text ) {
            console.group( "%c%s", "color:lightgreen", text )
        },
        groupEnd: function () {
            console.groupEnd()
        },
        log: function ( ...args ) {
            console.log( ...args )
        },
        logGreen: function ( text, ...args ) {
            console.log( "%c\u2713 %s", "color:green", text, ...args )
        },
        logRed: function ( text, ...args ) {
            console.log( "%c\u2717 %s", "color:salmon", text, ...args )
        },
        logSkip: function ( text, ...args ) {
            console.log( "%c%s", "color:gold", text, ...args )
        }
    }
}

const detectIfBrowser = new Function( "try {return this===window;}catch(e){ return false;}" )

export default detectIfBrowser() ? BrowserLogger() : NodeLogger()

