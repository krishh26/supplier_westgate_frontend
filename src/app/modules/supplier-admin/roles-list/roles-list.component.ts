import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
  rolesList: any[] = [];
  isLoading = false;
  page: number = 1;
  pagesize: number = 10;
  totalRecords: number = 0;

  constructor(
    private superService: SuperadminService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRolesList();
  }

  pageChanged(event: any) {
    this.page = event;
    this.getRolesList();
  }


  getRolesList() {
    this.isLoading = true;
    this.superService.getRolesList().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response && response.status) {
          console.log('API Response:', response.data); // Log the API response
          this.rolesList = response?.data?.roles || [];
          console.log('Roles List:', this.rolesList); // Log the processed roles list
        } else {
          this.notificationService.showError(response?.message || 'Failed to fetch roles');
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        this.notificationService.showError(error?.message || 'An error occurred while fetching roles');
      }
    });
  }

  viewRoleDetails(role: any) {
    // Navigate to resources view with role ID
    this.router.navigate(['/supplier-admin/resources-view'], {
      queryParams: { roleId: role._id }
    });
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
        this.superService.deleteRole(roleId).subscribe({
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
    this.router.navigate(['/supplier-admin/edit-roles'], {
      state: { roleData: roleData } // Pass the complete roleData object without modification
    });
  }
}
