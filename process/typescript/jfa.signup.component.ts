import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {SearchPipe} from './search.pipe';
import {UsersService} from './users.service'
import {UserNumbersComponent} from './jfa.userNumbers.component';
import {SocialMediaComponent} from './jfa.socialmedia.component';
import {JFAFirstWordPipe} from './first.pipe';


class Flower{
 constructor(
  public name:string,
  public email:string,
  public birthday:string,
  public interests:Interest[]
  ){}
}

class Interest{
  public id:number;
  public name:string;
}

@Component({
	selector: 'jfa-signup',
	templateUrl: 'partials/signup.component.html',
  directives: [UserNumbersComponent, NgClass, SocialMediaComponent],
  pipes:[JFAFirstWordPipe],
  styleUrls:[]
  
})

export class SignUpComponent {
  public flower:Flower;
  public numberOfSignups:number;
  public users;
  public numberOfUsers;
  public interests: Interest[];
  public clicking:boolean;
  public isSignUpTime:boolean;
  constructor(private usersService:UsersService){
    this.isSignUpTime = true;
    //for testing only
    this.flower = new Flower("Katellin","kate@me.com","1993-04-07",[]);
  };

  ngOnInit(){
    this.clicking = false;
    this.getUsers();
    this.getInterests();
  }
  updateInterests(e, interest, form){
    const allInterests = this.interests;
    
    if(e.target.checked){
        //add all interests
      if(interest.length == 0)
        for (var i = 0; i < allInterests.length; ++i) {
          if(this.flower.interests.indexOf(interest) < 0){
            this.flower.interests.push(allInterests[i]);
          }
        }
       else this.flower.interests.push(interest);
    }
    else {
      if(interest.length == 0)
        this.flower.interests = [];

      let index = this.flower.interests.indexOf(interest);
      this.flower.interests.splice(index,1);
    }
    console.log(this.flower.interests);
  }
  onSubmit(form){

    this.usersService.addUser(this.flower).subscribe(
      res => {
          res.status == 201 ? this.getUsers() : console.log("Error");
      }, 
      err => { 
        console.log(err);
      }, 
      () => this.resetForm());


  }
  resetForm(){
    this.flower = new Flower("","","",[]);
  }
  
  getUsers(){
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.numberOfUsers = users.length;
    });
    
  }
  getInterests(){
    this.usersService.getInterests().subscribe((interests) => {
      this.interests = interests;
    });
  }

  
  toggleClicking(state){
    console.log(state);
    this.clicking = state;
  }
}


