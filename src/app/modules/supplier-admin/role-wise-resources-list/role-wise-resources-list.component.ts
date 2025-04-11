import { Component, OnInit } from '@angular/core';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-role-wise-resources-list',
  templateUrl: './role-wise-resources-list.component.html',
  styleUrls: ['./role-wise-resources-list.component.scss']
})
export class RoleWiseResourcesListComponent {
  rolesList: any[] = [];
  loading: boolean = false;
  page: number = 1;
  pagesize: number = 10;
  totalRecords: number = 0;
  searchText: string = '';
  startDate: string = '';
  endDate: string = '';
  isToggled: boolean = false;
  isLoading = false;

  constructor(
    private superadminService: SuperadminService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getRolesList();
  }

  getRolesList() {
    this.loading = true;
    this.spinner.show();
    const queryParams: any = {};

    if (this.startDate) {
      queryParams.startDate = this.startDate;
    }
    if (this.endDate) {
      queryParams.endDate = this.endDate;
    }
    if (this.searchText) {
      queryParams.search = this.searchText;
    }

    this.superadminService.getRolesList(queryParams).subscribe({
      next: (response) => {
        this.rolesList = response.data?.roles || [];
        this.totalRecords = this.rolesList.length;
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  searchtext() {
    this.page = 1;
    this.getRolesList();
  }

  pageChanged(event: any) {
    this.page = event;
    this.getRolesList();
  }

  viewRoleDetails(role: any) {
    // Navigate to resources view with role ID
    this.router.navigate(['/supplier-admin/resources-view'], {
      queryParams: { roleId: role._id }
    });
  }

  applyDateFilter() {
    this.page = 1;
    this.getRolesList();
  }

  deleteRole(roleId: string) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.superadminService.deleteRole(roleId).subscribe({
          next: (response: any) => {
            if (response && response.status) {
              this.notificationService.showSuccess('Role deleted successfully');
              this.getRolesList(); // Refresh the list
            } else {
              this.notificationService.showError(response?.message || 'Failed to delete role');
            }
          },
          error: (error: any) => {
            this.notificationService.showError(error?.message || 'An error occurred while deleting the role');
          }
        });
      }
    });
  }

  editRole(roleId: string) {
    const roleData = this.rolesList.find(role => role._id === roleId);
    console.log('Complete role data:', roleData); // Log complete data

    // Store the complete role data in state
    this.router.navigate(['/super-admin/edit-roles', roleId], {
      state: { roleData: roleData } // Pass the complete roleData object without modification
    });
  }
}
