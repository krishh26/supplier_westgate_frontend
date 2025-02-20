import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { CustomValidation } from 'src/app/utility/shared/constant/custome-validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePassword = {
    newPassword: new FormControl("", [Validators.required]),
    oldPassword: new FormControl("", [Validators.required]),
    confirm_password: new FormControl("", [Validators.required]),
  };
  showLoader: boolean = false;
  changePasswordForm = new FormGroup(this.changePassword, [
    CustomValidation.MatchValidator('newPassword', 'confirm_password'),
  ]);
  showOldPassword = false;
  showNewPassword = false;
  loginUser: any;
  password = 'password';
  confirmPassword = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {

    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {

  }

  forgotpassword(): void {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.showLoader = true;
      const payload = {
        newPassword : this.changePasswordForm.get('newPassword')?.value,
        oldPassword : this.changePasswordForm.get('oldPassword')?.value
      }
      this.authService.changePassword(payload, this.loginUser?._id).subscribe((response) => {
        if (response?.status == true) {
          this.showLoader = false;
          this.router.navigateByUrl('/');
          this.notificationService.showSuccess(response?.message || 'Password change successfully');
          console.log(response?.data);

        } else if (response?.data == null) {
          this.showLoader = false;
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.showLoader = false;
        this.notificationService.showError(error?.message || 'Something went wrong!');
      })
    }
  }

}
