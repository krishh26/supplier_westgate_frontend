import { NotificationService } from 'src/app/services/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { pagination } from '../../constant/pagination.constant';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared.module';
import { ProjectNotificationService } from 'src/app/services/project-notification-service/project-notification.service';

@Component({
  selector: 'app-project-notification',
  templateUrl: './project-notification.component.html',
  styleUrls: ['./project-notification.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, NgbModule]
})
export class ProjectNotificationComponent implements OnInit {
  showLoader: boolean = false;
  projectNotificationList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  loginUser: any;

  constructor(
    private projectNotificationService: ProjectNotificationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getNotificationList();
  }

  // get list notification
  getNotificationList() {
    this.projectNotificationService.getNotificationList().subscribe((response) => {
      this.projectNotificationList = [];
      if (response?.status) {
        this.projectNotificationList = response?.data;
      } else {
        return this.notificationService.showError(response?.message || 'Something Went Wrong!');
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something Went Wrong!');
    })
  }

  // read notification
  readNotification(id : string) {
    this.projectNotificationService.readSingleNotification(id).subscribe((response) => {
      if (response?.status) {
        this.getNotificationList();
        // this.projectNotificationList = response?.data;
        this.notificationService.showSuccess(response?.message || 'Success');
        console.log('response',response);
      } else {
        return this.notificationService.showError(response?.message || 'Something Went Wrong!');
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something Went Wrong!');
    })
  }

  // read notification
 deleteNotification(id : string) {
    this.projectNotificationService.deleteSingleNotification(id).subscribe((response) => {
      if (response?.status) {
        this.getNotificationList();
        // this.projectNotificationList = response?.data;
        this.notificationService.showSuccess(response?.message || 'Success');
        console.log('response',response);
      } else {
        return this.notificationService.showError(response?.message || 'Something Went Wrong!');
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something Went Wrong!');
    })
  }

  paginate(page: number) {
    this.page = page;
    this.getNotificationList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
