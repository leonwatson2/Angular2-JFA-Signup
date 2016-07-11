import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class UsersService{

	constructor(private http:Http){}
	getUsers(){
		return this.http.get('./api/signups').map(res => {
			return res.json().signups;
		});
	}

	getInterests(){
		return this.http.get('./api/interests').map(res => {
			console.log(res.json().interests);
			return res.json().interests;
		});
	}

	getNames(){
		return this.http.get('./getUsers.php').map(res => {
			return res.json();
		});
	}

	addUser(newUser){
		if(newUser.name.length == 0){
			return;
		}
		var headers = new Headers({'Content-Type': 'application/json'});
		console.log(newUser);
		return this.http.post('./api/signups', JSON.stringify(newUser))
						.map(res => {
							console.log(res);
							return res;
						}).catch(res => {
				          // The error callback (second parameter) is called
				          return Observable.throw(res.json());
				          // The success callback (first parameter) is called
				          // return Observable.of(res.json());
				        });;
	}
}