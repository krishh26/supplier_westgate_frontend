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

interface DynamicArrays {
  [key: string]: string[];
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, DynamicArrays {
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

  // Technology Stack properties
  technologiesList: any[] = [];
  selectedTechnologies: any[] = [];

  // Client Information properties
  keyClients: string[] = [];

  // New properties for business details
  newCertification: string = '';
  certifications: string[] = [];

  // Supplier Type properties
  showSupplierTypeError = false;

  // Dynamic arrays for handleEnterKey and removeArrayItem methods
  [key: string]: any;

  maxDate = new Date().toISOString().split('T')[0]; // For date input max value

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
    this.initializeTechnologiesList();
    this.initializeCertifications();
    this.initializeKeyClients();

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

  NumberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
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

  compareTagsFn(item1: any, item2: any): boolean {
    return item1 && item2 && (item1._id === item2._id || item1._id === item2.itemId);
  }

  loadTags() {
    this.isLoadingTags = true;
    this.supplierAdminService.getTags().subscribe({
      next: (response) => {
        if (response?.status && response?.data?.tags) {
          this.tags = response.data.tags;

          // Initialize selected tags from loginUser
          if (this.loginUser?.expertiseICanDo?.length > 0) {
            this.selectedTags = this.tags.filter(tag =>
              this.loginUser.expertiseICanDo.some((userTag: any) => userTag.itemId === tag._id)
            );
          }
        }
        this.isLoadingTags = false;
      },
      error: (error) => {
        console.error('Error loading tags:', error);
        this.isLoadingTags = false;
      }
    });
  }

  onTagSearch(event: any) {
    if (event?.term) {
      this.isLoadingTags = true;
      this.supplierAdminService.getTags(event.term).subscribe({
        next: (response) => {
          if (response?.status && response?.data?.tags) {
            this.tags = response.data.tags;
          }
          this.isLoadingTags = false;
        },
        error: (error) => {
          console.error('Error searching tags:', error);
          this.isLoadingTags = false;
        }
      });
    }
  }

  onTagSelectionChange(event: any[]): void {
    // Directly update selectedTags
    this.selectedTags = event || [];
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

  onAddTag = (name: string) => {
    return { name, type: this.newExpertiseType };
  };

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

    // Format tags data - ensure it's not empty objects
    const expertiseICanDo = (this.selectedTags || []).map(tag => ({
      itemId: tag._id,
      name: tag.name
    })).filter(tag => tag.itemId && tag.name);

    const payload = {
      expertise: expertisePayload,
      expertiseICanDo: expertiseICanDo,
      employeeCount: this.loginUser.employeeCount,
      turnover: this.loginUser.turnover,
      totalProjectsExecuted: this.loginUser.totalProjectsExecuted,
      certifications: this.certifications,
      typeOfCompany: this.selectedBusinessTypes,
      technologyStack: this.selectedTechnologies,
      keyClients: this.keyClients
    };

    console.log('Update Profile Payload:', payload);

    this.supplierAdminService.updateUserProfile(this.loginUser._id, payload).subscribe({
      next: (response) => {
        const updatedUser = { ...this.loginUser, ...response.data };
        this.localStorageService.setItem('loginUser', updatedUser);
        this.loginUser = updatedUser;
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

  initializeCertifications() {
    if (this.loginUser?.certifications) {
      this.certifications = Array.isArray(this.loginUser.certifications)
        ? [...this.loginUser.certifications]
        : [this.loginUser.certifications];
    }
  }

  initializeKeyClients(): void {
    if (this.loginUser?.keyClients) {
      this.keyClients = Array.isArray(this.loginUser.keyClients)
        ? [...this.loginUser.keyClients]
        : [this.loginUser.keyClients];
    } else {
      this.keyClients = [];
    }
  }

  onKeyDown(event: KeyboardEvent, arrayName: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = event.target as HTMLInputElement;
      const value = input.value.trim();

      if (value) {
        if (arrayName === 'keyClients') {
          this.keyClients.push(value);
          this.loginUser.keyClients = [...this.keyClients];
        } else if (!this[arrayName]) {
          this[arrayName] = [];
        }
        input.value = '';
      }
    }
  }

  initializeTechnologiesList(): void {
    this.technologiesList = [
      'Microsoft',
      'Java',
      'Python',
      'JavaScript',
      'TypeScript',
      'C#',
      'PHP',
      'Ruby',
      'Swift',
      'Kotlin',
      'Go'
    ];

    // Set initial selection based on loginUser data
    if (this.loginUser?.technologyStack) {
      this.selectedTechnologies = Array.isArray(this.loginUser.technologyStack)
        ? [...this.loginUser.technologyStack]
        : [this.loginUser.technologyStack];
    } else {
      this.selectedTechnologies = [];
    }
  }

  onTechnologiesChange(event: any): void {
    this.selectedTechnologies = event || [];
  }

  checkSupplierTypeSelection(): void {
    this.showSupplierTypeError = !this.loginUser.resourceSharingSupplier && !this.loginUser.subcontractingSupplier;
  }

  hasInvalidExpertise(): boolean {
    return false; // Implement your validation logic here
  }

  onBusinessTypeChange(): void {
    if (this.selectedBusinessTypes && this.selectedBusinessTypes.length > 0) {
      this.loginUser.typeOfCompany = this.selectedBusinessTypes;
    }
  }

  removeArrayItem(arrayName: string, index: number): void {
    if (arrayName === 'keyClients') {
      this.keyClients.splice(index, 1);
      this.loginUser.keyClients = [...this.keyClients];
    } else if (this[arrayName] && Array.isArray(this[arrayName])) {
      this[arrayName].splice(index, 1);
    }
  }
}
