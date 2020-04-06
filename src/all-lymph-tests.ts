// import d1 from "./sample-tests/sample1.test"
// import d2 from "./sample-tests/sample2.test"
// import d3 from "./sample-tests/sample3.test"
// import d4 from "./sample-tests/sample4.test"
import d5 from "./sample-tests/sample5.test"

import { runSuites } from "./testing/runner"

const suites = [ d5 ]

window.addEventListener( "DOMContentLoaded", async function () {
    await runSuites( suites )
} )

