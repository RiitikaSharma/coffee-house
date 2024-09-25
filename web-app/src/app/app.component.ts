import { Component, OnInit } from '@angular/core';
import { AccountService } from './_service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'CoffeHouseUser';
constructor(private accountService:AccountService){}


  ngOnInit(): void {
    
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user:any = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
