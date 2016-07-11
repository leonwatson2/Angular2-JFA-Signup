System.register(['angular2/core', './users.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, users_service_1;
    var UserNumbersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            UserNumbersComponent = (function () {
                function UserNumbersComponent(usersService) {
                    this.usersService = usersService;
                }
                ;
                UserNumbersComponent.prototype.ngOnInit = function () {
                    // this.updateNumberOfSignups();
                };
                UserNumbersComponent.prototype.updateNumberOfSignups = function () {
                    var _this = this;
                    this.usersService.getUsers().subscribe(function (users) {
                        _this.numberOfSignups = users.length;
                    });
                };
                __decorate([
                    core_1.Input('numberOfUsers'), 
                    __metadata('design:type', Number)
                ], UserNumbersComponent.prototype, "numberOfSignups", void 0);
                UserNumbersComponent = __decorate([
                    core_1.Component({
                        selector: 'user-numbers',
                        templateUrl: 'partials/user-numbers.component.html',
                        directives: [],
                        styleUrls: []
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], UserNumbersComponent);
                return UserNumbersComponent;
            }());
            exports_1("UserNumbersComponent", UserNumbersComponent);
        }
    }
});

//# sourceMappingURL=jfa.userNumbers.component.js.map