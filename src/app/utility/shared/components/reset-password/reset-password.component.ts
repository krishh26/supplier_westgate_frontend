import { Component, OnInit } from '@angular/core';
import { BaseLogin } from '../../common/base-login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../constant/validation-patterns.const';
import { CustomValidation } from '../../constant/custome-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseLogin implements OnInit {

  defaultResetForm = {
    confirm_password: new FormControl("", [Validators.required, Validators.pattern(Patterns.password)]),
    password: new FormControl("", [Validators.required, Validators.pattern(Patterns.password)]),
  };

  resetForm = new FormGroup(this.defaultResetForm, [
    CustomValidation.MatchValidator('password', 'confirm_password'),
  ]);

  forgotUserEmail!: string;
  showLoader: boolean = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    super()
    this.activatedRoute.queryParams.subscribe(params => {
      this.forgotUserEmail = params['email'];
      if (!this.forgotUserEmail) {
        this.router.navigateByUrl('/auth/forgot-password');
      } // Outputs: darshandumaraliya@gmail.com
    });

    // this.forgotUserEmail = this.router.getCurrentNavigation()?.extras?.state?.['email'];
    // console.log("forgotUserEmail", this.forgotUserEmail)
    // // this.resetForm.controls.email.setValue(this.forgotUserEmail);
    // if (!this.forgotUserEmail) {
    //   this.router.navigateByUrl('/auth/forgot-password');
    // }
  }

  ngOnInit(): void {
  }

  // Function use for the reset-password
  resetPassword(): void {
    this.resetForm.markAllAsTouched();
    if (this.resetForm.valid) {
      this.showLoader = true;

      const payload = {
        email: this.forgotUserEmail,
        password: this.resetForm.value?.password,
        role: 'SupplierAdmin'
      }

      this.authService.resetPassword(payload).subscribe((response) => {
        if (response?.status === true) {
          this.notificationService.showSuccess(response?.message);
          this.router.navigateByUrl('/');
          this.showLoader = false;
        } else {
          this.notificationService.showError(response?.message);
          this.showLoader = false;
        }
      }, (error) => {
        this.notificationService.showError(error?.message);
        this.showLoader = false;
      })
    }
  }

}
