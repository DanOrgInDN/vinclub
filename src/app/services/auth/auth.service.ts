import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../model/auth.model';
import { environment } from '../../enviroment/enviroment';
import { UserInfo } from '../../model/user.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    this.loadStoredAuth();
  }

  get currentUser$(): Observable<UserInfo | null> {
    return this.currentUserSubject.asObservable();
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  get userId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userInfo: UserInfo = JSON.parse(user);
        return userInfo.userId;
      }
    }
    return null;
  }

  get username(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        const userInfo: UserInfo = JSON.parse(user);
        return userInfo.username;
      }
    }
    return null;
  }

  get currentUserValue(): UserInfo | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  private loadStoredAuth() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.currentUserSubject.next(JSON.parse(user));
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  public handleAuthentication(response: AuthResponse) {
    // Lưu tokens
    localStorage.setItem('token', response.result_data.token);
    localStorage.setItem('refreshToken', response.result_data.refreshToken);

    // Tạo và lưu thông tin user
    const userInfo = {
      userId: response.result_data.userId,
      username: response.result_data.username,
      roleId: response.result_data.roleId
    };
    localStorage.setItem('user', JSON.stringify(userInfo));

    // Update subjects
    this.currentUserSubject.next(userInfo as UserInfo);
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}