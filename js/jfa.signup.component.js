System.register(['angular2/core', 'angular2/common', './users.service', './jfa.userNumbers.component', './jfa.socialmedia.component', './first.pipe'], function(exports_1, context_1) {
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
    var core_1, common_1, users_service_1, jfa_userNumbers_component_1, jfa_socialmedia_component_1, first_pipe_1;
    var Flower, Interest, SignUpComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (jfa_userNumbers_component_1_1) {
                jfa_userNumbers_component_1 = jfa_userNumbers_component_1_1;
            },
            function (jfa_socialmedia_component_1_1) {
                jfa_socialmedia_component_1 = jfa_socialmedia_component_1_1;
            },
            function (first_pipe_1_1) {
                first_pipe_1 = first_pipe_1_1;
            }],
        execute: function() {
            Flower = (function () {
                function Flower(name, email, birthday, interests) {
                    this.name = name;
                    this.email = email;
                    this.birthday = birthday;
                    this.interests = interests;
                }
                return Flower;
            }());
            Interest = (function () {
                function Interest() {
                }
                return Interest;
            }());
            SignUpComponent = (function () {
                function SignUpComponent(usersService) {
                    this.usersService = usersService;
                    this.isSignUpTime = true;
                    this.flower = new Flower("Katellin", "kate@me.com", "1993-04-07", []);
                }
                ;
                SignUpComponent.prototype.ngOnInit = function () {
                    console.log("Hey");
                    this.clicking = false;
                    this.getUsers();
                    this.getInterests();
                };
                SignUpComponent.prototype.updateInterests = function (e, interest, form) {
                    var allInterests = this.interests;
                    var input = document.getElementsByTagName("input");
                    console.log(input);
                    if (e.target.checked) {
                        //add all interests
                        if (interest.length == 0)
                            for (var i = 0; i < allInterests.length; ++i) {
                                if (this.flower.interests.indexOf(interest) < 0) {
                                    this.flower.interests.push(allInterests[i]);
                                }
                            }
                        else
                            this.flower.interests.push(interest);
                    }
                    else {
                        if (interest.length == 0)
                            this.flower.interests = [];
                        var index = this.flower.interests.indexOf(interest);
                        this.flower.interests.splice(index, 1);
                    }
                    console.log(this.flower.interests);
                };
                SignUpComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    this.usersService.addUser(this.flower).subscribe(function (res) {
                        res.status == 201 ? _this.getUsers() : console.log("Error");
                    }, function (err) {
                        console.log(err);
                    });
                };
                SignUpComponent.prototype.getUsers = function () {
                    var _this = this;
                    this.usersService.getUsers().subscribe(function (users) {
                        _this.users = users;
                        _this.numberOfUsers = users.length;
                    });
                };
                SignUpComponent.prototype.getInterests = function () {
                    var _this = this;
                    this.usersService.getInterests().subscribe(function (interests) {
                        _this.interests = interests;
                    });
                };
                SignUpComponent.prototype.toggleClicking = function (state) {
                    console.log(state);
                    this.clicking = state;
                };
                SignUpComponent = __decorate([
                    core_1.Component({
                        selector: 'jfa-signup',
                        templateUrl: 'partials/signup.component.html',
                        directives: [jfa_userNumbers_component_1.UserNumbersComponent, common_1.NgClass, jfa_socialmedia_component_1.SocialMediaComponent],
                        pipes: [first_pipe_1.JFAFirstWordPipe],
                        styleUrls: []
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], SignUpComponent);
                return SignUpComponent;
            }());
            exports_1("SignUpComponent", SignUpComponent);
        }
    }
});

//# sourceMappingURL=jfa.signup.component.js.map
