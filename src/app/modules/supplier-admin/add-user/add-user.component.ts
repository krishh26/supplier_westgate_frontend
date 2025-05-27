import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { CustomValidation } from 'src/app/utility/shared/constant/custome-validation';
import { Patterns } from 'src/app/utility/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  showLoader: boolean = false;

  constructor(
    private supplierService: SupplierAdminService,
    private notificationService: NotificationService,
    private router: Router,
  ) {}

  defaultOnboardForm = {
    userName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.pattern(Patterns.email)]),
    domain: new FormControl("", [Validators.required]),
    department: new FormControl("", [Validators.required]),
  };

  onboardingForm = new FormGroup(this.defaultOnboardForm, []);

  ngOnInit(): void {

  }

  addManageUser() {
    this.onboardingForm.markAllAsTouched();
    if (!this.onboardingForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }
    this.showLoader = true;
    this.supplierService.addUser(this.onboardingForm.value).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.notificationService.showSuccess('Add User successfully.');
        this.onboardingForm.reset();
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

}
