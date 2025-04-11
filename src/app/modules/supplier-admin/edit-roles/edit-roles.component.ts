import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent {
  roleForm: FormGroup;
  roleId: string = '';
  isLoading: boolean = false;
  newOtherRole: string = '';
  otherRoles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private superService: SuperadminService,
    private notificationService: NotificationService
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      otherRoles: []
    });
  }

  ngOnInit(): void {
    // Get data from router state
    const currentState = history.state;
    console.log('Complete state received:', currentState); // Log complete state
    const roleData = currentState.roleData;

    if (roleData) {
      this.roleId = roleData._id;
      this.setRoleData(roleData);
    } else {
      this.notificationService.showError('No role data found');
      this.router.navigate(['/supplier-admin/roles-list']);
    }
  }

  setRoleData(roleData: any) {
    console.log('Setting role data:', roleData); // Log the data being set

    // Set form values
    this.roleForm.patchValue({
      name: roleData.name || ''
    });

    // Set other roles - check for both possible property names
    const otherRolesData = roleData.otherRoles || roleData.other_roles || [];
    console.log('Other roles data:', otherRolesData); // Log other roles data

    this.otherRoles = Array.isArray(otherRolesData) ? [...otherRolesData] : [];
    console.log('Final other roles array:', this.otherRoles); // Log final array
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

  onSubmit() {
    if (this.roleForm.valid) {
      this.isLoading = true;
      const formData = {
        name: this.roleForm.get('name')?.value,
        otherRole: this.otherRoles // Make sure this is included
      };

      console.log('Submitting form data:', formData); // For debugging

      this.superService.updateRole(this.roleId, formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response && response.status) {
            this.notificationService.showSuccess('Role updated successfully');
            this.router.navigate(['/supplier-admin/roles-list']);
          } else {
            this.notificationService.showError(response?.message || 'Failed to update role');
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.notificationService.showError(error?.message || 'An error occurred while updating the role');
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.roleForm.controls).forEach(key => {
        const control = this.roleForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
