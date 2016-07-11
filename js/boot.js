System.register(['angular2/platform/browser', './jfa.signup.component', 'angular2/http', './users.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, jfa_signup_component_1, http_1, users_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (jfa_signup_component_1_1) {
                jfa_signup_component_1 = jfa_signup_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            // enableProdMode();
            browser_1.bootstrap(jfa_signup_component_1.SignUpComponent, [
                http_1.HTTP_PROVIDERS,
                users_service_1.UsersService
            ]);
        }
    }
});

//# sourceMappingURL=boot.js.map
