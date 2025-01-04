import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  private apiUrl = environment.apiUrl + '/withdraw';
  constructor( private http: HttpClient) { }

  withdrawal(data: any) {
    return this.http.post<any>(this.apiUrl + '/create', data);
  }
}
