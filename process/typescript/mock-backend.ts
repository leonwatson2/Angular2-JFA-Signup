import {Request, Response, ResponseOptions, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

export class MockBackend {
    constructor() {
    }

    createConnection(request: Request) {
        var response = new Observable((responseObserver: Observer<Response>) => {
            var responseData;
            var responseOptions;
            switch (request.method) {
                case RequestMethod.Get:
                    if (request.url.split("/").length == 1) {
                       var req = request.url.split("/")[0];
                        if(req == "users"){
                            var users;
                                users = {users: this._users};
                                responseOptions = new ResponseOptions({
                                    body: JSON.parse(JSON.stringify(users)),
                                    status: 200
                            });
                        }else if(req == "interests"){
                            var interests = this._interests;
                            responseOptions = new ResponseOptions({
                                body: JSON.parse(JSON.stringify(interests)),
                                status: 200
                            });
                        } else{
                            responseOptions = new ResponseOptions({
                                body: JSON.stringify({error: req + ":Not a valid query."}),
                                status: 404
                            });
                            responseObserver.error(new Response(responseOptions));
                        }
                    } else {
                        var req = request.url.split("/")[1];
                        var userNames;
                        if(req == "names"){
                            userNames = this._users.map(users =>  users.name)
                        }
                        responseOptions = new ResponseOptions({
                            body: JSON.parse(JSON.stringify(userNames)),
                            status: 200
                        });
                    }
                    break;
                case RequestMethod.Post:
                    var user = JSON.parse(request.text().toString());
                    user.id = this._getNewId();
                    this._users.push(user);
                    responseOptions = new ResponseOptions({ status: 201 });
                    break;
                case RequestMethod.Delete:
                    var id = parseInt(request.url.split('/')[1]);
                    this._deleteMediaItem(id);
                    responseOptions = new ResponseOptions({ status: 200 });
            }
            
            var responseObject = new Response(responseOptions);
            responseObserver.next(responseObject);
            responseObserver.complete();
            return () => { };
        });
        return { response };
    }
    
    _deleteMediaItem(id) {
        var user = this._users.find(user => user.id === id);
        var index = this._users.indexOf(user);
        if (index >= 0) {
            this._users.splice(index, 1);
        }
    }
    
    _getNewId() {
        if (this._users.length > 0) {
            return Math.max.apply(Math, this._users.map(mediaItem => mediaItem.id)) + 1;
        }
    }
  _interests = [
      "Everything!", 
      "Hooping", 
      "Juggling", 
      "Poi", 
      "Flower Stick" , 
      "Kendama", 
      "Yo-yo", 
      "Levi wand", 
      "Unicycle", 
      "Contact Juggling"];

    _users = [
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