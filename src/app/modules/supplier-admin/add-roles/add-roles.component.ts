import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';


@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent {
  roleData: any = {
    name: '',
    otherRoles: []
  };
  isLoading: boolean = false;
  newOtherRole: string = '';
  otherRoles: string[] = [];

  constructor(
    private superService: SuperadminService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addOtherRole(): void {
    if (this.newOtherRole?.trim() && !this.otherRoles.includes(this.newOtherRole.trim())) {
      this.otherRoles.push(this.newOtherRole.trim());
      this.newOtherRole = '';
    }
  }

  removeOtherRole(index: number): void {
    this.otherRoles.splice(index, 1);
  }

  onSubmit(): void {
    if (!this.roleData.name) {
      this.notificationService.showError('Please enter role name');
      return;
    }

    this.isLoading = true;
    this.roleData.otherRoles = this.otherRoles;

    this.superService.addRole(this.roleData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.status) {
          this.notificationService.showSuccess('Role added successfully');
          this.router.navigate(['/supplier-admin/roles-list']);
        } else {
          this.notificationService.showError(response.message || 'Failed to add role');
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        this.notificationService.showError(error.message || 'An error occurred while adding role');
      }
    });
  }
}
