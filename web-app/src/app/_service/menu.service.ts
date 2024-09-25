import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  baseUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getMenus(){
    return this.http.get<any>(this.baseUrl + 'menu');
  }

}