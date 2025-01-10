import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../shared/alert/services/alert.service';
import { NotificationService } from '../../../../shared/notification/services/notification.service';

@Component({
  selector: 'app-reference-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reference-code.component.html',
  styleUrl: './reference-code.component.scss'
})
export class ReferenceCodeComponent {
  currentPage = 1;
  totalPages = 10;
  referenceCodes: any[] = [];
  pageSize = 10;
  searchTerm = '';

  constructor(private adminService: AdminService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadReferenceCode();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.searchReferenceCode()
  }


  loadReferenceCode(): void {
    const data = {
      page: this.currentPage,
      size: this.pageSize,
    };
    this.adminService.getReferenceCode(data).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.referenceCodes = response.result_data.content;
          this.totalPages = response.result_data.totalPages;
        }
      },
      error: (error: any) => {
      }

    });
  }

  createReferenceCode(): void {
    this.adminService.createReferenceCode().subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.loadReferenceCode();
          this.notificationService.showSuccess('Tạo mã tham chiếu thành công');
        } else {
          this.notificationService.showError('Tạo mã tham chiếu thất bại');
        }
      },
      error: (error: any) => {
        this.notificationService.showError('Tạo mã tham chiếu thất bại');
      }
    });
  }


  searchReferenceCode(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.loadReferenceCode();
    } else {
      const data = {
        search_text: this.searchTerm,
        page: this.currentPage,
        size: this.pageSize
      }
      this.adminService.searchReferenceCode(data).subscribe({
        next: (response: any) => {
          this.referenceCodes = response.result_data.content;
          this.totalPages = response.result_data.totalPages;
        }
      });
    }
  }

  deleteRef(id: number){

  }
}
