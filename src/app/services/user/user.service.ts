import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroment/enviroment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user';
  constructor(private http: HttpClient) { }

  getUser(user_id: string | null) {
    return this.http.get(`${this.apiUrl}/${user_id}`);
  }
}
