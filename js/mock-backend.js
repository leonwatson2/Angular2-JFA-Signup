System.register(['angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var http_1, Observable_1;
    var MockBackend;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            MockBackend = (function () {
                function MockBackend() {
                    this._interests = [
                        "Everything!",
                        "Hooping",
                        "Juggling",
                        "Poi",
                        "Flower Stick",
                        "Kendama",
                        "Yo-yo",
                        "Levi wand",
                        "Unicycle",
                        "Contact Juggling"];
                    this._users = [
                        {
                            "id": 0,
                            "name": "Silva Everett",
                            "email": "silvaeverett@liquidoc.com",
                            "birthdate": "1990-12-01"
                        },
                        {
                            "id": 1,
                            "name": "Dawson Mccray",
                            "email": "dawsonmccray@liquidoc.com",
                            "birthdate": "1994-47-06"
                        },
                        {
                            "id": 2,
                            "name": "Hendricks Hatfield",
                            "email": "hendrickshatfield@liquidoc.com",
                            "birthdate": "1997-45-14"
                        },
                        {
                            "id": 3,
                            "name": "Leann May",
                            "email": "leannmay@liquidoc.com",
                            "birthdate": "1998-30-12"
                        },
                        {
                            "id": 4,
                            "name": "Hancock Burnett",
                            "email": "hancockburnett@liquidoc.com",
                            "birthdate": "1991-18-07"
                        },
                        {
                            "id": 5,
                            "name": "Farrell Carroll",
                            "email": "farrellcarroll@liquidoc.com",
                            "birthdate": "1998-59-18"
                        },
                        {
                            "id": 6,
                            "name": "Sylvia Bradley",
                            "email": "sylviabradley@liquidoc.com",
                            "birthdate": "2000-29-12"
                        },
                        {
                            "id": 7,
                            "name": "Brewer Oliver",
                            "email": "breweroliver@liquidoc.com",
                            "birthdate": "1990-09-03"
                        },
                        {
                            "id": 8,
                            "name": "Greene Melendez",
                            "email": "greenemelendez@liquidoc.com",
                            "birthdate": "1994-36-28"
                        },
                        {
                            "id": 9,
                            "name": "Hughes Santiago",
                            "email": "hughessantiago@liquidoc.com",
                            "birthdate": "1990-25-28"
                        }
                    ];
                }
                MockBackend.prototype.createConnection = function (request) {
                    var _this = this;
                    var response = new Observable_1.Observable(function (responseObserver) {
                        var responseData;
                        var responseOptions;
                        switch (request.method) {
                            case http_1.RequestMethod.Get:
                                if (request.url.split("/").length == 1) {
                                    var req = request.url.split("/")[0];
                                    if (req == "users") {
                                        var users;
                                        users = { users: _this._users };
                                        responseOptions = new http_1.ResponseOptions({
                                            body: JSON.parse(JSON.stringify(users)),
                                            status: 200
                                        });
                                    }
                                    else if (req == "interests") {
                                        var interests = _this._interests;
                                        responseOptions = new http_1.ResponseOptions({
                                            body: JSON.parse(JSON.stringify(interests)),
                                            status: 200
                                        });
                                    }
                                    else {
                                        responseOptions = new http_1.ResponseOptions({
                                            body: JSON.stringify({ error: req + ":Not a valid query." }),
                                            status: 404
                                        });
                                        responseObserver.error(new http_1.Response(responseOptions));
                                    }
                                }
                                else {
                                    var req = request.url.split("/")[1];
                                    var userNames;
                                    if (req == "names") {
                                        userNames = _this._users.map(function (users) { return users.name; });
                                    }
                                    responseOptions = new http_1.ResponseOptions({
                                        body: JSON.parse(JSON.stringify(userNames)),
                                        status: 200
                                    });
                                }
                                break;
                            case http_1.RequestMethod.Post:
                                var user = JSON.parse(request.text().toString());
                                user.id = _this._getNewId();
                                _this._users.push(user);
                                responseOptions = new http_1.ResponseOptions({ status: 201 });
                                break;
                            case http_1.RequestMethod.Delete:
                                var id = parseInt(request.url.split('/')[1]);
                                _this._deleteMediaItem(id);
                                responseOptions = new http_1.ResponseOptions({ status: 200 });
                        }
                        var responseObject = new http_1.Response(responseOptions);
                        responseObserver.next(responseObject);
                        responseObserver.complete();
                        return function () { };
                    });
                    return { response: response };
                };
                MockBackend.prototype._deleteMediaItem = function (id) {
                    var user = this._users.find(function (user) { return user.id === id; });
                    var index = this._users.indexOf(user);
                    if (index >= 0) {
                        this._users.splice(index, 1);
                    }
                };
                MockBackend.prototype._getNewId = function () {
                    if (this._users.length > 0) {
                        return Math.max.apply(Math, this._users.map(function (mediaItem) { return mediaItem.id; })) + 1;
                    }
                };
                return MockBackend;
            }());
            exports_1("MockBackend", MockBackend);
        }
    }
});

//# sourceMappingURL=mock-backend.js.map
