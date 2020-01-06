import { Component, OnInit } from '@angular/core';
import { User } from './models/user.interface';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'testing';
  myVar = 'Hola Mundo';
  saludo = 'Hola Mario';
  users:User[] = []
  
  constructor(private userService:UserService){
    
  }

  ngOnInit(){
    this.getUsers()
  }

  par(numero:number):boolean{
    return numero%2===0 ? true : false
  }

  getUsers(){
    this.userService.getAll().subscribe(users => {
      this.users = users
      console.log(users)
    })
  }

}
