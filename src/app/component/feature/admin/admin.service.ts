import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllUsers(data: any) {
        return this.http.post(this.apiUrl + '/admin/user/all', data);
    }

    searchUsers(data: any) {
        return this.http.post(this.apiUrl + '/admin/user/search', data);
    }

    activateUser(userId: string) {
        return this.http.patch(this.apiUrl + '/admin/activate/' + userId, {});
    }

    deleteUser(userId: string) {
        return this.http.delete(this.apiUrl + '/admin/delete/' + userId);
    }

    getDepositsPending(data: any) {
        return this.http.get(this.apiUrl + '/deposit/pending', { params: data });
    }

    searchDeposits(data: any) {
        return this.http.get(this.apiUrl + '/deposit/search', { params: data });
    }

    approveDeposit(depositId: string) {
        return this.http.patch(this.apiUrl + '/deposit/approve/' + depositId, {});
    }

    rejectDeposit(depositId: string) {
        return this.http.patch(this.apiUrl + '/deposit/reject/' + depositId, {});
    }

    getWithdrawals(data: any) {
        return this.http.get(this.apiUrl + '/withdraw/pending', { params: data });
    }

    searchWithdrawals(data: any) {
        return this.http.get(this.apiUrl + '/withdraw/search', { params: data });
    }

    approveWithdrawal(withdrawalId: string) {
        return this.http.patch(this.apiUrl + '/withdraw/approve/' + withdrawalId, {});
    }

    rejectWithdrawal(withdrawalId: string) {
        return this.http.patch(this.apiUrl + '/withdraw/reject/' + withdrawalId, {});
    }

    createReferenceCode() {
        return this.http.post(this.apiUrl + '/admin/code/create', {});
    }

    getReferenceCode(data: any) {
        return this.http.get(this.apiUrl + '/admin/code/all', { params: data });
    }

    searchReferenceCode(data: any) {
        return this.http.get(this.apiUrl + '/admin/search', { params: data });
    }

    addFund(username: string, amount: number) {
        return this.http.post(
            this.apiUrl + '/admin/fund/add?username=' + (username) + '&amount=' + (amount),
            {}
        );
    }

    deductFund(username: string, amount: number) {
        return this.http.post(
            this.apiUrl + '/admin/fund/deduct?username=' + (username) + '&amount=' + (amount),
            {}
        );
    }

}
