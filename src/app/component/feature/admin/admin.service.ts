import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private apiUrl = environment.apiUrl + '/admin';
    constructor( private http: HttpClient ) { }

    getAllUsers(data: any) {
        return this.http.post(this.apiUrl + '/user/all', data);
    }

    activateUser(userId: string) {
        return this.http.patch(this.apiUrl + '/activate/' + userId, {});
    }

    deleteUser(userId: string) {
        return this.http.delete(this.apiUrl + '/delete/' + userId);
    }
}
