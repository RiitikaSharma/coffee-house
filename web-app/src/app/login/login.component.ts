import { Component } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  model:any = {};
  constructor(public accountService: AccountService, private route:Router){}
 login(){
  this.accountService.login(this.model).subscribe({
    next: _ => this.route.navigateByUrl('/menu')
  })
}
  
  
}
