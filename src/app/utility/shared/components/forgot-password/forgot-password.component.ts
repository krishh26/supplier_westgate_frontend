import { Component, OnInit } from '@angular/core';
import { BaseLogin } from '../../common/base-login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../constant/validation-patterns.const';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseLogin implements OnInit {

  loginUser: any;
  showLoader: boolean = false;

  forgotPasswordForm = {
    email: new FormControl("", [Validators.required, Validators.pattern(Patterns.email)]),
  };

  forgotForm = new FormGroup(this.forgotPasswordForm, []);

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService
  ) {
    super()
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    // if (this.loginUser) {
    //   this.router.navigateByUrl('/boss-user/home');
    // }
  }

  forgotpassword(): void {
    this.forgotForm.markAllAsTouched();
    if (this.forgotForm.valid) {
      this.showLoader = true;
      this.spinner.show();
      this.authService.forgotPassword({ ...this.forgotForm.value, role: 'SupplierAdmin' }).subscribe((response) => {
        if (response?.status == true) {
          this.showLoader = false;
          this.spinner.hide();
          this.router.navigateByUrl('/');
          this.notificationService.showSuccess(response?.message || 'Email sent successfully');
        } else if (response?.data == null) {
          this.showLoader = false;
          this.notificationService.showError(response?.message);
          this.spinner.hide();
        }
      }, (error) => {
        this.showLoader = false;
        this.spinner.hide();
        this.notificationService.showError(error?.error?.message || 'Something went wrong!');
      })
    }
  }


}
