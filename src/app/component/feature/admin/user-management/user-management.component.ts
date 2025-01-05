import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { UserInfo } from '../../../../model/user.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit, OnDestroy {

  allUsers: UserInfo[] = [];
  users: UserInfo[] = [];
  filteredUsers: UserInfo[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadAllUsers();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.performSearch();
    });
  }

  loadAllUsers() {
    const data = {
      page_number: this.currentPage,
      page_size: this.pageSize
    }
    this.adminService.getAllUsers(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.allUsers = response.result_data.list_user;
          this.filteredUsers = [...this.allUsers];
          this.updateDisplayedUsers();
        }
      },
      error: (error: any) => {
      }
    });
  }

  private performSearch() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredUsers = [...this.allUsers];
    } else {
      this.filteredUsers = this.allUsers.filter(user =>
        user.phone.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
      );
    }
    
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.users = this.filteredUsers.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  searchUsers() {
    this.searchSubject.next(this.searchTerm);
  }

  activateUser(userId: string) {
    this.adminService.activateUser(userId).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.loadAllUsers();
        }
      }
    });
  }

  // deactivateUser(userId: string) {
  //   this.adminService.deactivateUser(userId).subscribe({
  //     next: (response: any) => {
  //       if (response.result_code === 1) {
  //         this.loadAllUsers();
  //       }
  //     }
  //   });
  // }

  deleteUser(userId: string) {
    this.adminService.deleteUser(userId).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.loadAllUsers();
        }
      }
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}