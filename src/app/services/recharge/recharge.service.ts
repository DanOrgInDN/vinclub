import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class RechargeService {
  private apiUrl = environment.apiUrl + '/deposit';
  constructor( private http: HttpClient ) { }

  recharge(data: any) {
    return this.http.post(this.apiUrl + '/create', data);
  }
}
