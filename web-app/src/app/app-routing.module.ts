import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './_guards/auth.guard';
import { MenuListComponent } from './menu/menu-list/menu-list.component';

const routes: Routes = [

  {path:'', component:AppComponent},
  {path:'login', component:LoginComponent},
  {path:'',
  runGuardsAndResolvers: 'always',
  canActivate:[authGuard],
  children:[
    {path:'menu', component:MenuListComponent},
  ]
},
  {path:'**', component:AppComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
