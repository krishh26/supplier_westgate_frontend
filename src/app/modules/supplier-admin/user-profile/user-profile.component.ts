import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';

interface ExpertiseItem {
  name: string;
  itemId: string;
  type: string;
  isSystem: boolean;
  isMandatory: boolean;
  subExpertise?: string[];
  _id?: string;
  value?: string;
}

interface CategoryData {
  [key: string]: Array<{
    _id: string;
    name: string;
    type: string;
    isSystem: boolean;
    isMandatory?: boolean;
  }>;
}

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

  // Expertise related variables
  expertiseOptions: ExpertiseItem[] = [];
  selectedExpertise: ExpertiseItem[] = [];
  existingExpertise: ExpertiseItem[] = [];
  isLoadingExpertise = false;
  isLoadingSubExpertise = false;
  subExpertiseMap: { [key: number]: string[] } = {};
  selectedSubExpertiseMap: { [key: number]: any[] } = {};
  subExpertiseOptions: any[] = [];
  subExpertiseInput$ = new Subject<string>();
  expertiseGroupedOptions: ExpertiseItem[] = [];
  selectedExpertiseItems: ExpertiseItem[] = [];
  newExpertiseType: string = 'technologies';
  addingNewSubExpertise = false;

  // Business Types properties
  businessTypesList: any[] = [];
  selectedBusinessTypes: string[] = [];

  // Industry Sector properties
  industryList: any[] = [];
  selectedIndustries: string[] = [];

  // New properties for business details
  newCertification: string = '';
  certifications: string[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private supplierAdminService: SupplierAdminService,
    private superadminService: SuperadminService
  ) {
    this.loginUser = this.localStorageService.getItem('loginUser');

    // Setup typeahead for sub-expertise search
    this.subExpertiseInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.isLoadingSubExpertise = true;
        return this.supplierAdminService.getSubExpertiseList();
      })
    ).subscribe({
      next: (response) => {
        if (response?.status) {
          this.subExpertiseOptions = response.data || [];
        }
        this.isLoadingSubExpertise = false;
      },
      error: (error) => {
        console.error('Error loading sub-expertise options:', error);
        this.isLoadingSubExpertise = false;
      }
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.loadTags();
    this.loadExpertiseOptions();
    this.loadSubExpertiseOptions();
    this.initializeBusinessTypes();
    this.getIndustryList();
    this.initializeCertifications();

    // Initialize existing expertise
    if (this.loginUser?.expertise) {
      this.existingExpertise = this.loginUser.expertise.map((exp: any) => ({
        name: exp.name,
        itemId: exp.itemId || exp._id,
        type: exp.type || 'technologies',
        subExpertise: exp.subExpertise || []
      }));
      this.selectedExpertise = [...this.existingExpertise];

      // Initialize sub-expertise map
      this.existingExpertise.forEach((exp, index) => {
        if (exp.subExpertise?.length) {
          this.subExpertiseMap[index] = [...exp.subExpertise];
        }
      });
    }

    // Initialize existing tags
    if (this.loginUser?.expertiseICanDo) {
      this.existingTags = this.loginUser.expertiseICanDo;
      this.selectedTags = [...this.existingTags];
    }
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
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getFormattedCertifications(): string {
    return Array.isArray(this.loginUser?.certifications)
      ? this.loginUser.certifications.join(', ')
      : '-';
  }

  getFormattedExpertise(): string {
    return Array.isArray(this.loginUser?.expertise)
      ? this.loginUser.expertise.map((exp: any) => exp.name).join(', ')
      : '-';
  }

  getFormattedICanDo(): string {
    return Array.isArray(this.loginUser?.expertiseICanDo)
      ? this.loginUser.expertiseICanDo.map((item: any) => item.name).join(', ')
      : '-';
  }

  getFormattedKeyClients(): string {
    return Array.isArray(this.loginUser?.keyClients)
      ? this.loginUser.keyClients.join(', ')
      : '-';
  }

  getFormattedTechnologyStack(): string {
    return Array.isArray(this.loginUser?.technologyStack)
      ? this.loginUser.technologyStack.join(', ')
      : '-';
  }

  loadTags() {
    this.isLoadingTags = true;
    this.supplierAdminService.getTags().subscribe({
      next: (response) => {
        this.tags = response.data;
        this.isLoadingTags = false;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.isLoadingTags = false;
      }
    });
  }

  onTagSearch(event: any) {
    // Implement if needed
  }

  onTagSelectionChange(event: any) {
    // Keep existing tags and add new ones
    const newTags = event.filter((tag: any) =>
      !this.existingTags.some((existing: any) => existing._id === tag._id)
    );

    this.selectedTags = [...this.existingTags, ...newTags];
  }

  compareTagsFn(item: any, selected: any) {
    return item?._id === selected?._id;
  }

  loadExpertiseOptions() {
    this.isLoadingExpertise = true;
    this.supplierAdminService.getDropdownList().subscribe({
      next: (response) => {
        console.log('Expertise response:', response);
        if (response?.status && response?.data) {
          // Initialize arrays to store expertise items
          let allExpertise: ExpertiseItem[] = [];

          // Process each category in the data array
          response.data.forEach((category: CategoryData) => {
            // Get the category key (technologies, domain, product, etc.)
            const categoryKey = Object.keys(category)[0];

            // Add all items from this category to our array
            if (Array.isArray(category[categoryKey])) {
              const items = category[categoryKey].map(item => ({
                name: item.name,
                itemId: item._id,
                type: item.type || categoryKey,
                isSystem: item.isSystem,
                isMandatory: item.isMandatory || false
              }));
              allExpertise = [...allExpertise, ...items];
            }
          });

          this.expertiseOptions = allExpertise;
          this.expertiseGroupedOptions = [...allExpertise];

          console.log('Mapped expertise options:', this.expertiseOptions);
          console.log('Grouped expertise options:', this.expertiseGroupedOptions);
        }
        this.isLoadingExpertise = false;
      },
      error: (error) => {
        console.error('Error loading expertise options:', error);
        this.isLoadingExpertise = false;
      }
    });
  }

  loadSubExpertiseOptions(searchText: string = '') {
    this.isLoadingSubExpertise = true;
    this.supplierAdminService.getSubExpertiseList().subscribe({
      next: (response) => {
        if (response?.status) {
          this.subExpertiseOptions = response.data || [];
        }
        this.isLoadingSubExpertise = false;
      },
      error: (error) => {
        console.error('Error loading sub-expertise options:', error);
        this.isLoadingSubExpertise = false;
      }
    });
  }

  onExpertiseSelectionChange(event: any) {
    console.log('Expertise selection changed:', event); // Debug log

    if (!event) {
      // If trying to remove, reset to existing expertise
      this.selectedExpertise = [...this.existingExpertise];
      return;
    }

    // Keep existing expertise and add new ones
    const newExpertise = event.filter((item: any) =>
      !this.existingExpertise.some((existing: any) => existing.itemId === item.itemId)
    );

    this.selectedExpertise = [...this.existingExpertise, ...newExpertise];
    console.log('Updated selected expertise:', this.selectedExpertise); // Debug log
  }

  onSubExpertiseChange(index: number, event: any) {
    console.log('Sub-expertise change:', { index, event });
    if (!this.selectedSubExpertiseMap[index]) {
      this.selectedSubExpertiseMap[index] = [];
    }
    this.selectedSubExpertiseMap[index] = event;
  }

  addSubExpertise(index: number) {
    console.log('Adding sub-expertise for index:', index);
    if (!this.subExpertiseMap[index]) {
      this.subExpertiseMap[index] = [];
    }

    const selectedItems = this.selectedSubExpertiseMap[index] || [];
    const newItems = selectedItems.map(item => {
      // Handle both string values and object values
      return typeof item === 'string' ? item : item.name;
    }).filter(item => !this.subExpertiseMap[index].includes(item));

    console.log('New items to add:', newItems);

    this.subExpertiseMap[index] = [
      ...this.subExpertiseMap[index],
      ...newItems
    ];

    // Clear the selection after adding
    this.selectedSubExpertiseMap[index] = [];
  }

  removeExpertise(index: number) {
    // Don't allow removing existing expertise
    if (index >= this.existingExpertise.length) {
      this.selectedExpertise.splice(index, 1);
      delete this.subExpertiseMap[index];
    }
  }

  removeSubExpertise(expertiseIndex: number, subExpertiseIndex: number) {
    if (this.subExpertiseMap[expertiseIndex]) {
      this.subExpertiseMap[expertiseIndex] = this.subExpertiseMap[expertiseIndex].filter((_, index) => index !== subExpertiseIndex);
    }
  }

  toggleSelectAllExpertise(event: any) {
    if (event.target.checked) {
      this.selectedExpertiseItems = [...this.expertiseGroupedOptions];
    } else {
      this.selectedExpertiseItems = [];
    }
  }

  toggleSelectAllSubExpertise(index: number, event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedSubExpertiseMap[index] = [...this.subExpertiseOptions];
    } else {
      this.selectedSubExpertiseMap[index] = [];
    }
  }

  onAddTagSubExpertise = (name: string) => {
    return { name: name, _id: null };
  };

  updateProfile() {
    if (!this.loginUser?._id) {
      console.error('User ID not found');
      return;
    }

    this.isUpdating = true;

    // Format expertise data
    const expertisePayload = this.selectedExpertise.map((exp, index) => ({
      itemId: exp.itemId || exp._id,
      name: exp.name,
      type: exp.type || 'technologies',
      subExpertise: this.subExpertiseMap[index] || []
    }));

    // Format tags data
    const tagsPayload = this.selectedTags.map(tag => ({
      itemId: tag._id,
      name: tag.name
    }));

    const payload = {
      expertise: expertisePayload,
      expertiseICanDo: tagsPayload,
      employeeCount: this.loginUser.employeeCount,
      turnover: this.loginUser.turnover,
      totalProjectsExecuted: this.loginUser.totalProjectsExecuted,
      certifications: this.certifications,
      typeOfCompany: this.selectedBusinessTypes,
      industrySector: this.selectedIndustries
    };

    this.supplierAdminService.updateUserProfile(this.loginUser._id, payload).subscribe({
      next: (response) => {
        const updatedUser = { ...this.loginUser, ...response.data };
        this.localStorageService.setItem('loginUser', updatedUser);
        this.loginUser = updatedUser;

        this.existingTags = this.selectedTags;
        this.existingExpertise = this.selectedExpertise;

        this.notificationService.showSuccess('Profile updated successfully');
        this.isUpdating = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.notificationService.showError('Failed to update profile');
        this.isUpdating = false;
      }
    });
  }

  initializeBusinessTypes() {
    this.businessTypesList = [
      { name: 'Private Limited Company', value: 'Private Limited Company' },
      { name: 'Public Limited Company', value: 'Public Limited Company' },
      { name: 'Limited Liability Partnership (LLP)', value: 'Limited Liability Partnership (LLP)' },
      { name: 'Partnership Firm', value: 'Partnership Firm' },
      { name: 'Sole Proprietorship', value: 'Sole Proprietorship' },
      { name: 'One Person Company (OPC)', value: 'One Person Company (OPC)' },
      { name: 'Section 8 Company (Non-Profit)', value: 'Section 8 Company (Non-Profit)' },
      { name: 'Hindu Undivided Family (HUF)', value: 'Hindu Undivided Family (HUF)' },
      { name: 'Cooperative Society', value: 'Cooperative Society' },
      { name: 'Trust', value: 'Trust' }
    ];

    // Set initial selection based on loginUser data
    if (this.loginUser?.typeOfCompany) {
      this.selectedBusinessTypes = Array.isArray(this.loginUser.typeOfCompany)
        ? this.loginUser.typeOfCompany
        : [this.loginUser.typeOfCompany];
    }
  }

  getIndustryList() {
    this.superadminService.getIndustryList().subscribe({
      next: (response) => {
        console.log('Industry response:', response); // Debug log
        if (response?.status) {
          // Map the industry data correctly based on API response
          this.industryList = response.data.map((item: any) => ({
            name: item.name || item.industry || item,
            value: item.name || item.industry || item
          }));

          // Set initial selection based on loginUser data
          if (this.loginUser?.industrySector) {
            this.selectedIndustries = Array.isArray(this.loginUser.industrySector)
              ? this.loginUser.industrySector
              : [this.loginUser.industrySector];
          }
        }
      },
      error: (error) => {
        console.error('Error fetching industry list:', error);
      }
    });
  }

  onBusinessTypeChange() {
    // Update the form data
    if (this.selectedBusinessTypes && this.selectedBusinessTypes.length > 0) {
      this.loginUser.typeOfCompany = this.selectedBusinessTypes;
    }
  }

  onIndustryChange() {
    // Update the form data
    if (this.selectedIndustries && this.selectedIndustries.length > 0) {
      this.loginUser.industrySector = this.selectedIndustries;
    }
  }

  initializeCertifications() {
    if (this.loginUser?.certifications) {
      this.certifications = Array.isArray(this.loginUser.certifications)
        ? [...this.loginUser.certifications]
        : [this.loginUser.certifications];
    }
  }

  handleEnterKey(event: Event, arrayName: string) {
    event.preventDefault();
    if (arrayName === 'certifications' && this.newCertification?.trim()) {
      if (!this.certifications.includes(this.newCertification.trim())) {
        this.certifications.push(this.newCertification.trim());
        this.loginUser.certifications = this.certifications;
        this.newCertification = '';
      }
    }
  }

  removeArrayItem(arrayName: string, index: number) {
    if (arrayName === 'certifications') {
      this.certifications.splice(index, 1);
      this.loginUser.certifications = this.certifications;
    }
  }
}
