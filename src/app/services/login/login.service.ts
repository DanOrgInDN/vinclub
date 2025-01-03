import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../../model/user.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../model/auth.model';
import { AuthService } from '../auth/auth.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl + '/un_auth';

  constructor( private http: HttpClient, private authService: AuthService ) { }


  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signin`, { username, password })
      .pipe( 
        tap(response => {
          if (response.result_code === 1) {
            this.authService.handleAuthentication(response);
          }
        })
      );
  }

  register(user: UserInfo) {
    return this.http.post(`${this.apiUrl}/signup/user`, user);
  }
}
