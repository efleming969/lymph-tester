require("mocha/mocha.js");

const ConsoleReporter = function(runner) {
    runner.on("suite", function(suite) {
        if (suite.title !== "")
            console.group(suite.title);
    });

    runner.on("pending", function(test) {
        console.log("%c%s", "color:burlywood", test.title);
    });

    runner.on("pass", function(test) {
        console.log("%c%s", "color:green", test.title);
    });

    runner.on("fail", function(test, err) {
        console.log("%c%s", "padding:0 15px;font-size:medium;color:white;background-color:red", test.title);
        console.log(err.stack);
        console.log("%c%s", "color:red", "----");
    });

    runner.on("suite end", function(suite) {
        if (suite.title !== "")
            console.groupEnd();
    });
};

mocha.setup({
    ui: "bdd", color: false, reporter: ConsoleReporter
});

require("./index.test.tsx");
require("./Forms.test.tsx");
require("./LoginForm.test.tsx");

window.addEventListener("DOMContentLoaded", function() {
    mocha.run();
});
