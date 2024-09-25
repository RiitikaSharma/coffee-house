import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';
import { MenuService } from 'src/app/_service/menu.service';
import { MenuFormComponent } from '../menu-form/menu-form.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  menus$: Observable<any> | undefined;
  bsModalRef!: BsModalRef;
  constructor(private menuService:MenuService, private modalService: BsModalService) {}
  ngOnInit(): void {
    this.menus$ = this.menuService.getMenus();
    console.log("data from observable",this.menus$)
  }

  addMenu(){
    this.bsModalRef = this.modalService.show(MenuFormComponent);
  }
}
