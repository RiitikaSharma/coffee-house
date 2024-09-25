import { Component } from '@angular/core';
import { AccountService } from '../_service/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  
constructor(public accountService: AccountService, private route:Router, 
  private toastr: ToastrService) {}

  logout(){
    this.accountService.logout();
    this.route.navigateByUrl('/')
  }
}
