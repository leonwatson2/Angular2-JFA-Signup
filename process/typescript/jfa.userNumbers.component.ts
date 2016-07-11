import {Component, Input} from 'angular2/core';
import {UsersService} from './users.service'


@Component({
	selector: 'user-numbers',
	templateUrl: 'partials/user-numbers.component.html',
  directives: [],
  styleUrls:[]
  
})

export class UserNumbersComponent {
  @Input('numberOfUsers') public numberOfSignups:number;

    constructor(private usersService:UsersService){
  };

  ngOnInit(){
    // this.updateNumberOfSignups();
  }


  updateNumberOfSignups(){
    this.usersService.getUsers().subscribe((users) => {
      this.numberOfSignups = users.length;
    });
  }

}


