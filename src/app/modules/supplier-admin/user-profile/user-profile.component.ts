import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';

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

  tags: any[] = [];
  selectedTags: any[] = [];
  existingTags: any[] = [];
  isLoadingTags = false;
  isUpdating = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private supplierService: SupplierAdminService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.loadTags();
  }

  getUserDetails(): void {
    this.authService.getUserData().subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.userData = response.data;
          this.loginUser = response.data;
          if (this.loginUser?.expertiseICanDo) {
            // Store existing tags in their original format
            this.existingTags = [...this.loginUser.expertiseICanDo];
            // Convert existing tags to match the format of new tags for ng-select
            this.selectedTags = this.existingTags.map(tag => ({
              _id: tag.itemId,
              name: tag.name
            }));
          }
        }
      },
      error: (error) => {
        this.notificationService.showError(error?.error?.message || 'Error loading user details');
      }
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

  loadTags(search: string = '') {
    this.isLoadingTags = true;
    this.supplierService.getTags(search).subscribe({
      next: (response) => {
        if (response?.status) {
          this.tags = response.data?.tags || [];
        }
      },
      error: (error) => {
        this.notificationService.showError(error?.error?.message || 'Error loading tags');
      },
      complete: () => {
        this.isLoadingTags = false;
      }
    });
  }

  onTagSearch(event: any) {
    const search = event?.term || '';
    this.loadTags(search);
  }

  onTagSelectionChange(event: any) {
    if (!event) {
      // If trying to remove, reset to existing tags
      this.selectedTags = this.existingTags.map(tag => ({
        _id: tag.itemId,
        name: tag.name
      }));
      return;
    }

    // Ensure existing tags are always included
    const existingTagIds = this.existingTags.map(tag => tag.itemId);
    const selectedTagIds = event.map((tag: any) => tag._id);

    // Check if any existing tag is missing from selection
    const isMissingExistingTags = existingTagIds.some(id => !selectedTagIds.includes(id));

    if (isMissingExistingTags) {
      // If existing tags were removed, restore them
      this.selectedTags = [
        ...this.existingTags.map(tag => ({
          _id: tag.itemId,
          name: tag.name
        })),
        ...event.filter((tag: any) => !existingTagIds.includes(tag._id))
      ];
    } else {
      this.selectedTags = event;
    }
  }

  updateProfile() {
    if (!this.loginUser?._id) {
      this.notificationService.showError('User ID not found');
      return;
    }

    // Convert selected tags to the required format and filter out existing ones
    const existingTagIds = this.existingTags.map(tag => tag.itemId);
    const newTags = this.selectedTags
      .filter(tag => !existingTagIds.includes(tag._id))
      .map(tag => ({
        itemId: tag._id,
        name: tag.name
      }));

    if (newTags.length === 0) {
      this.notificationService.showError('No new tags selected to add');
      return;
    }

    this.isUpdating = true;

    const payload = {
      expertiseICanDo: [
        ...this.existingTags,
        ...newTags
      ]
    };

    this.supplierService.updateUserProfile(this.loginUser._id, payload).subscribe({
      next: (response) => {
        if (response?.status) {
          this.notificationService.showSuccess('Profile updated successfully');
          this.existingTags = payload.expertiseICanDo;
          this.getUserDetails();
        } else {
          this.notificationService.showError(response?.message || 'Failed to update profile');
        }
      },
      error: (error) => {
        this.notificationService.showError(error?.error?.message || 'Error updating profile');
      },
      complete: () => {
        this.isUpdating = false;
      }
    });
  }

  compareTagsFn(item: any, selected: any) {
    return item?._id === selected?._id || item?._id === selected?.itemId;
  }
}
