import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData!: any;
  skills: any[] = [
    {
      id: 1,
      name: "Organization"
    },
    {
      id: 2,
      name: "Creativity"
    },
    {
      id: 3,
      name: "Leadership"
    },
    {
      id: 4,
      name: "Team Building"
    },
    {
      id: 5,
      name: "SEO"
    },
    {
      id: 6,
      name: "Social Media"
    },
    {
      id: 7,
      name: "Content Management"
    },
    {
      id: 8,
      name: "Data Analysis"
    }
  ]
  managesData: any[] = [
    {
      id: 1,
      name: "Graphic designers"
    },
    {
      id: 2,
      name: "Copy Writers"
    },
    {
      id: 3,
      name: "social media marketing manager"
    },
  ]
  reportToData: any[] = [
    {
      id: 1,
      name: "User 1"
    },
    {
      id: 2,
      name: "User 2"
    },
    {
      id: 3,
      name: "User 3"
    },
  ]

  changePassword = {
    newPassword: new FormControl("", [Validators.required]),
    oldPassword: new FormControl("", [Validators.required]),
  };
  showLoader: boolean = false;
  loginUser: any;
  changePasswordForm = new FormGroup(this.changePassword, []);
  showOldPassword = false;
  showNewPassword = false;

  password = 'password';
  confirmPassword = 'password';
  showPassword = false;

  userDataForm = {
    name: new FormControl(""),
    companyAddress: new FormControl(""),
    email: new FormControl(""),
    customerSupportContact: new FormControl(""),
    jobTitle: new FormControl(""),
    professionalSkill: new FormControl(""),
    reportTo: new FormControl(""),
    manages: new FormControl(""),
    VATOrGSTNumber: new FormControl(""),
    complianceCertifications: new FormControl(""),
    employeeCount: new FormControl(""),
    typeOfCompany: new FormControl(""),
    website: new FormControl(""),
    yearOfEstablishment: new FormControl(""),
    companyDirectors_Owners:new FormControl(""),
  };

  userForm = new FormGroup(this.userDataForm, []);

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.loginUser = this.localStorageService.getLogger();
   }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.authService.getUserData().subscribe((response: any) => {
      if (response?.status) {
        this.userData = response.data;
        console.log('response.data', response.data);
        this.userForm.controls['email'].setValue(response?.data?.email || "");
        this.userForm.controls['name'].setValue(response?.data?.name || "");
        this.userForm.controls['companyAddress'].setValue(response?.data?.companyAddress || "");
        this.userForm.controls['customerSupportContact'].setValue(response?.data?.customerSupportContact || "");
        this.userForm.controls['VATOrGSTNumber'].setValue(response?.data?.VATOrGSTNumber || "");
        this.userForm.controls['complianceCertifications'].setValue(response?.data?.complianceCertifications || "");
        this.userForm.controls['employeeCount'].setValue(response?.data?.employeeCount || "");
        this.userForm.controls['typeOfCompany'].setValue(response?.data?.typeOfCompany || "");
        this.userForm.controls['website'].setValue(response?.data?.website || "");
        this.userForm.controls['yearOfEstablishment'].setValue(response?.data?.yearOfEstablishment || "");
        this.userForm.controls['companyDirectors_Owners'].setValue(response?.data?.companyDirectors_Owners || "");
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Error');
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return
    }
    this.authService.updateUser(this.userData._id, this.userForm.value).subscribe((response: any) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Error');
    });
  }

  forgotpassword(): void {
    this.changePasswordForm.markAllAsTouched();
    if (this.changePasswordForm.valid) {
      this.showLoader = true;
      this.authService.changePassword(this.changePasswordForm.value, this.loginUser?._id).subscribe((response) => {
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
        this.notificationService.showError(error?.error?.message || 'Something went wrong!');
      })
    }
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getFormattedCertifications(): string {
    return this.loginUser?.certifications?.join(', ') || '-';
  }

  getFormattedExpertise(): string {
    return this.loginUser?.expertise?.map((item: any) => item.name)?.join(', ') || '-';
  }

  getFormattedICanDo(): string {
    return this.loginUser?.expertiseICanDo?.map((item: any) => item.name).join(', ') || '-';
  }

  getFormattedKeyClients(): string {
    return this.loginUser?.keyClients?.join(', ') || '-';
  }

  getFormattedTechnologyStack(): string {
    return this.loginUser?.technologyStack?.join(', ') || '-';
  }

}
