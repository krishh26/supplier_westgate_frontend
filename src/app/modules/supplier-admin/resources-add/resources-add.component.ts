import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-resources-add',
  templateUrl: './resources-add.component.html',
  styleUrls: ['./resources-add.component.scss']
})
export class ResourcesAddComponent implements OnInit {

  // Form controls for the user profile
  userProfileForm: FormGroup = this.fb.group({});

  // Exchange rate (INR to GBP)
  exchangeRate: number = 114.32; // Default value with decimal precision, will be updated from API
  workingDaysPerYear: number = 240;
  hoursPerDay: number = 8;
  ukMultiplier: number = 3; // UK Day Rate = Pound equivalent * 3

  // Arrays to store tag-like inputs
  previousEmployers: string[] = [];
  technicalSkills: string[] = [];
  softSkills: string[] = [];
  languagesKnown: string[] = [];
  certifications: string[] = [];

  // Temporary inputs for tag-like fields
  newEmployer: string = '';
  newSoftSkill: string = '';
  newLanguage: string = '';
  newCertification: string = '';

  // Arrays to store project tech stacks
  projectTechStacks: string[][] = [[]];

  // Dropdown options
  genderOptions = ['Male', 'Female', 'Other'];
  languageOptions = [
    'Spoken', 'Written languages'
  ];
  projectComplexityOptions = ['Simple', 'Medium', 'Complex'];
  technologiesList: any[] = [];
  industryDomainList: any[] = [];

  showLoader: boolean = false;
  supplierID: string = '';
  supplierData: any = [];
  rolesList: any[] = [];
  loginUser: any;
  // Add a class property to store the candidate ID if in edit mode
  candidateId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private superService: SuperadminService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.loginUser = this.localStorageService.getLogger();
    console.log('Constructor - loginUser:', this.loginUser);
    this.initializeForm();
    this.getRolesList();
    this.getTechnologies();
    this.getIndustryDomains();
    this.fetchExchangeRate();
  }

  ngOnInit(): void {
    // Log the current form value and loginUser for debugging
    console.log('ngOnInit - Current form value:', this.userProfileForm.value);
    console.log('ngOnInit - loginUser:', this.loginUser);

    // Make sure the supplierId in the form is set from loginUser
    if (this.loginUser && this.loginUser._id) {
      this.userProfileForm.patchValue({
        supplierId: this.loginUser._id
      });
      console.log('ngOnInit - Updated form with loginUser._id:', this.loginUser._id);
    } else {
      console.error('ngOnInit - No valid loginUser found:', this.loginUser);
    }

    // Check if we're in edit mode by looking for candidateId in query params
    this.route.queryParams.subscribe(params => {
      if (params['candidateId']) {
        this.candidateId = params['candidateId'];
        // Load candidate data from localStorage instead of API
        this.loadCandidateDataFromStorage();
      }
    });

    // Add value change listeners for rate calculations
    this.setupRateCalculations();

    // Keep track of previously selected currentRole
    let previousRole: string | null = null;

    // Subscribe to changes in the currentRole field
    this.userProfileForm.get('currentRole')?.valueChanges.subscribe(selectedRole => {
      if (selectedRole) {
        const currentRoleIds = this.userProfileForm.get('roleId')?.value || [];

        // Remove the previous currentRole from the roleId array if it exists
        if (previousRole && currentRoleIds.includes(previousRole)) {
          const filteredRoleIds = currentRoleIds.filter((roleId: string) => roleId !== previousRole);

          // Add the newly selected role to the roleId array
          this.userProfileForm.patchValue({
            roleId: [...filteredRoleIds, selectedRole]
          });
        } else {
          // Just add the selected role to the existing roleId array
          this.userProfileForm.patchValue({
            roleId: [...currentRoleIds, selectedRole]
          });
        }

        // Update previousRole for next change
        previousRole = selectedRole;
      }
    });
  }

  initializeForm() {
    this.userProfileForm = this.fb.group({
      supplierId: [this.loginUser?._id || ''],
      fullName: ['', Validators.required],
      gender: [''],
      nationality: ['', Validators.required],
      highestQualification: ['', Validators.required],
      yearOfGraduation: [''],
      totalExperience: ['', [Validators.required, Validators.min(0)]],
      // jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      keyResponsibilities: ['', Validators.required],
      availableFrom: [''],
      // hourlyRate: ['', [Validators.required, Validators.min(0)]],
      ctc: [''],
      ukHourlyRate: [''],
      ukDayRate: [''],
      indianDayRate: [''],
      projectsExecuted: [''],
      // workingHoursPerWeek: ['', [Validators.required, Validators.min(0), Validators.max(168)]],
      // overtimeCharges: [''],
      currentRole: [null],
      roleId: [[], Validators.required],
      //  otherJobTitle: [''],
      projectsWorkedOn: this.fb.array([this.createProjectForm()])
    });

    console.log('initializeForm - Setting supplierId to:', this.loginUser?._id);
  }

  createProjectForm(): FormGroup {
    return this.fb.group({
      projectName: [''],
      clientName: [''],
      projectDuration: [''],
      industryDomain: [''],
      projectDescription: [''],
      keyResponsibilities: [''],
      teamSize: [''],
      contributionPercentage: [''],
      projectComplexity: [null],
      outcomeImpact: [''],
      clientFeedback: ['']
    });
  }

  // Getters for form controls
  get projectsWorkedOn(): FormArray {
    return this.userProfileForm.get('projectsWorkedOn') as FormArray;
  }

  // Add/remove functions for projects
  addProject(): void {
    this.projectsWorkedOn.push(this.createProjectForm());
    this.projectTechStacks.push([]);
  }

  removeProject(index: number): void {
    this.projectsWorkedOn.removeAt(index);
    this.projectTechStacks.splice(index, 1);
  }

  // Add/remove functions for tag-like inputs
  addEmployer(): void {
    if (this.newEmployer?.trim() && !this.previousEmployers.includes(this.newEmployer.trim())) {
      this.previousEmployers.push(this.newEmployer.trim());
      this.newEmployer = '';
    }
  }

  removeEmployer(index: number): void {
    this.previousEmployers.splice(index, 1);
  }

  addSoftSkill(): void {
    if (this.newSoftSkill?.trim() && !this.softSkills.includes(this.newSoftSkill.trim())) {
      this.softSkills.push(this.newSoftSkill.trim());
      this.newSoftSkill = '';
    }
  }

  removeSoftSkill(index: number): void {
    this.softSkills.splice(index, 1);
  }

  addLanguage(): void {
    if (this.newLanguage && !this.languagesKnown.includes(this.newLanguage)) {
      this.languagesKnown.push(this.newLanguage);
      this.newLanguage = '';
    }
  }

  removeLanguage(index: number): void {
    this.languagesKnown.splice(index, 1);
  }

  addCertification(): void {
    if (this.newCertification?.trim() && !this.certifications.includes(this.newCertification.trim())) {
      this.certifications.push(this.newCertification.trim());
      this.newCertification = '';
    }
  }

  removeCertification(index: number): void {
    this.certifications.splice(index, 1);
  }

  // Handle technical skills selection changes
  onTechnicalSkillsChange(event: any): void {
    console.log('Technical skills changed:', this.technicalSkills);
  }

  // Handle tech stack selection changes
  onTechStackChange(event: any, index: number): void {
    console.log(`Tech stack changed for project ${index}:`, this.projectTechStacks[index]);
  }

  // Form submission
  submitForm(): void {
    console.log('=== SUBMIT FORM STARTING ===');
    console.log('Form value:', this.userProfileForm.value);
    console.log('Form valid:', this.userProfileForm.valid);
    console.log('Technical skills:', this.technicalSkills);
    console.log('loginUser:', this.loginUser);

    if (this.userProfileForm.invalid || this.technicalSkills.length === 0) {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.userProfileForm);
      if (this.technicalSkills.length === 0) {
        this.notificationService.showError('Technical Skills are required');
      } else {
        console.log('Form validation errors:', this.getFormValidationErrors());
        this.notificationService.showError('Please fill in all required fields correctly');
      }
      return;
    }

    // Ensure at least one role is selected
    const selectedRoles = this.userProfileForm.get('roleId')?.value;
    if (!selectedRoles || selectedRoles.length === 0) {
      this.notificationService.showError('At least one role must be selected');
      return;
    }

    try {
      // Prepare the data in the required format
      const formData = {...this.userProfileForm.value};

      // Parse numeric values for submission
      if (formData.ctc) formData.ctc = this.parseNumericValue(formData.ctc);
      if (formData.ukHourlyRate) formData.ukHourlyRate = this.parseNumericValue(formData.ukHourlyRate);
      if (formData.ukDayRate) formData.ukDayRate = this.parseNumericValue(formData.ukDayRate);
      if (formData.indianDayRate) formData.indianDayRate = this.parseNumericValue(formData.indianDayRate);

      // Make sure we're using the current supplierId
      if (!this.loginUser || !this.loginUser._id) {
        console.error('No login user ID found:', this.loginUser);
        this.notificationService.showError('Error: Unable to determine the supplier ID');
        return;
      }

      // Set the supplier ID from the login user
      formData.supplierId = this.loginUser._id;
      console.log('Setting supplierId from loginUser._id:', formData.supplierId);

      // Add the array fields that are managed separately
      const userData = {
        ...formData,
        previousEmployers: this.previousEmployers,
        technicalSkills: this.technicalSkills,
        softSkills: this.softSkills,
        languagesKnown: this.languagesKnown,
        certifications: this.certifications
      };

      // Add tech stack to each project and handle null projectComplexity
      userData.projectsWorkedOn = userData.projectsWorkedOn.map((project: any, index: number) => {
        const { projectComplexity, ...projectWithoutComplexity } = project;  // Destructure to remove projectComplexity
        return {
          ...projectWithoutComplexity,
          techStackUsed: this.projectTechStacks[index] || []
        };
      });

      // Format the data as requested
      const finalData = {
        data: [userData]
      };

      // Log the data to console
      console.log('Final Payload:', JSON.stringify(finalData));

      // Show loader
      this.showLoader = true;

      // Determine if we're updating or creating
      if (this.candidateId) {
        // Add the ID to the data for update
        userData._id = this.candidateId;
        console.log('Updating candidate with ID:', this.candidateId);

        // Create a simplified update structure that matches what the backend expects
        const updateData = {
          data: userData  // Since backend might expect a single object instead of an array
        };

        console.log('Update API call starting with data:', JSON.stringify(updateData));

        // Update existing candidate
        this.superService.updateCandidate(this.candidateId, updateData).subscribe({
          next: (response: any) => {
            console.log('Update response:', response);
            this.showLoader = false;
            if (response.status) {
              // Clear the stored candidate data
              localStorage.removeItem('editCandidateData');

              // Trigger a refresh of the candidate list when returning to the list view
              localStorage.setItem('refreshCandidatesList', 'true');

              this.notificationService.showSuccess('Candidate profile updated successfully');
              // Navigate with skipLocationChange to force component reload
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/supplier-admin/role-wise-resources-list']);
              });
            } else {
              this.notificationService.showError(response.message || 'Failed to update candidate profile');
            }
          },
          error: (error: any) => {
            console.error('Update API error:', error);
            this.showLoader = false;
            this.notificationService.showError(error.error?.message || error.message || 'An error occurred while updating candidate profile');
          }
        });
      } else {
        // Create new candidate
        console.log('Create API call starting with data:', JSON.stringify(finalData));
        this.superService.addCandidate(finalData).subscribe({
          next: (response: any) => {
            console.log('Create response:', response);
            this.showLoader = false;
            if (response.status) {
              this.notificationService.showSuccess('Candidate profile added successfully');
              this.router.navigate(['/supplier-admin/role-wise-resources-list']);
            } else {
              this.notificationService.showError(response.message || 'Failed to add candidate profile');
            }
          },
          error: (error: any) => {
            console.error('Create API error:', error);
            this.showLoader = false;
            this.notificationService.showError(error.error?.message || error.message || 'An error occurred while adding candidate profile');
          }
        });
      }
    } catch (err) {
      console.error('Error in form submission:', err);
      this.showLoader = false;
      this.notificationService.showError('An unexpected error occurred while processing the form');
    }
  }

  // Debug function for submit button click
  handleSubmitClick(event: MouseEvent): void {
    console.log('Submit button clicked');
    // Don't prevent the default action, as we want the form submission to proceed
    // This is just for debugging purposes
  }

  // Helper method to get all validation errors from the form
  getFormValidationErrors(): any {
    const result: any = {};
    Object.keys(this.userProfileForm.controls).forEach(key => {
      const control = this.userProfileForm.get(key);
      if (control && control.errors) {
        result[key] = control.errors;
      }
    });
    return result;
  }

  // Helper function to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        for (let i = 0; i < control.length; i++) {
          if (control.at(i) instanceof FormGroup) {
            this.markFormGroupTouched(control.at(i) as FormGroup);
          }
        }
      }
    });
  }

  // Number validation for input fields - allow numbers and decimal point
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    // Allow numbers (48-57) and decimal point (46)
    if (
      (charCode > 31 && (charCode < 48 || charCode > 57)) &&
      charCode !== 46 // Allow decimal point (.)
    ) {
      return false;
    }

    // Prevent multiple decimal points
    if (charCode === 46) {
      const value = event.target.value;
      if (value.indexOf('.') > -1) {
        return false;
      }
    }

    return true;
  }

  getRolesList() {
    this.superService.getAllRoles().subscribe({
      next: (data) => {
        if (data && data.status && data.data && data.data.roles) {
          this.rolesList = data.data.roles;
        } else {
          console.error('Unexpected roles data structure:', data);
          this.notificationService.showError('Failed to load roles data');
        }
      },
      error: (error) => {
        console.error('Error fetching roles:', error);
        this.notificationService.showError('Failed to fetch roles');
      }
    });
  }

  getTechnologies() {
    this.superService.getTechnologies().subscribe({
      next: (data) => {
        this.technologiesList = data.data || [];
      },
      error: (error) => {
        console.error('Error fetching technologies:', error);
        this.notificationService.showError('Failed to fetch technologies');
      }
    });
  }

  // Helper function to format date for input fields
  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  // Function to load candidate data from localStorage
  loadCandidateDataFromStorage() {
    const storedCandidateData = localStorage.getItem('editCandidateData');
    if (storedCandidateData) {
      const candidateData = JSON.parse(storedCandidateData);
      console.log('loadCandidateDataFromStorage - Loaded candidate data:', candidateData);

      // Map the roleId array to extract just the IDs for the select input
      let roleIds: string[] = [];
      if (candidateData.roleId && Array.isArray(candidateData.roleId)) {
        // If roleId is an array of objects with _id property
        if (candidateData.roleId.length > 0 && typeof candidateData.roleId[0] === 'object') {
          roleIds = candidateData.roleId.map((role: any) => role._id);
        }
        // If roleId is already an array of strings
        else {
          roleIds = candidateData.roleId;
        }
      }
      // If roleId is a single string, convert to array
      else if (candidateData.roleId) {
        roleIds = [candidateData.roleId];
      }

      // Make sure we're using the loginUser._id for supplierId
      const supplierIdToUse = this.loginUser?._id || candidateData.supplierId || '';
      console.log('loadCandidateDataFromStorage - Using supplierId:', supplierIdToUse);

      // Patch the form with candidate data
      this.userProfileForm.patchValue({
        supplierId: supplierIdToUse,
        fullName: candidateData.fullName,
        gender: candidateData.gender,
        nationality: candidateData.nationality,
        highestQualification: candidateData.highestQualification,
        yearOfGraduation: candidateData.yearOfGraduation,
        totalExperience: candidateData.totalExperience,
        startDate: candidateData.startDate,
        keyResponsibilities: candidateData.keyResponsibilities,
        availableFrom: this.formatDateForInput(candidateData.availableFrom),
        // hourlyRate: candidateData.hourlyRate,
        ctc: candidateData.ctc,
        ukHourlyRate: candidateData.ukHourlyRate,
        ukDayRate: candidateData.ukDayRate,
        indianDayRate: candidateData.indianDayRate,
        projectsExecuted: candidateData.projectsExecuted,
        currentRole: candidateData.currentRole,
        roleId: roleIds
      });

      console.log('loadCandidateDataFromStorage - Form after patch:', this.userProfileForm.value);

      // Set the arrays for tag-like inputs
      if (candidateData.previousEmployers) {
        this.previousEmployers = [...candidateData.previousEmployers];
      }
      if (candidateData.technicalSkills) {
        this.technicalSkills = [...candidateData.technicalSkills];
      }
      if (candidateData.softSkills) {
        this.softSkills = [...candidateData.softSkills];
      }
      if (candidateData.languagesKnown) {
        this.languagesKnown = [...candidateData.languagesKnown];
      }

      // Handle projects worked on
      if (candidateData.projectsWorkedOn && candidateData.projectsWorkedOn.length > 0) {
        // Clear the default empty project
        while (this.projectsWorkedOn.length) {
          this.projectsWorkedOn.removeAt(0);
        }
        this.projectTechStacks = [];

        // Add each project from the data
        candidateData.projectsWorkedOn.forEach((project: any, index: number) => {
          this.projectsWorkedOn.push(this.fb.group({
            projectName: [project.projectName || ''],
            clientName: [project.clientName || ''],
            projectDuration: [project.projectDuration || ''],
            industryDomain: [project.industryDomain || ''],
            projectDescription: [project.projectDescription || ''],
            keyResponsibilities: [project.keyResponsibilities || ''],
            teamSize: [project.teamSize || ''],
            contributionPercentage: [project.contributionPercentage || ''],
            projectComplexity: [project.projectComplexity || null],
            outcomeImpact: [project.outcomeImpact || ''],
            clientFeedback: [project.clientFeedback || '']
          }));

          // Add tech stack for this project
          this.projectTechStacks.push(project.techStackUsed || []);
        });
      }

      // After loading the data, clear it from localStorage to avoid issues if the user refreshes
      // Comment out this line if you need to persist the data across refreshes
      // localStorage.removeItem('editCandidateData');
    } else {
      this.notificationService.showError('Failed to load candidate data');
      this.router.navigate(['/supplier-admin/role-wise-resources-list']);
    }
  }

  // Add new method to fetch industry domains
  getIndustryDomains(): void {
    this.superService.getSubExpertiseDropdownList().subscribe({
      next: (response: any) => {
        if (response.status) {
          // Handle array of strings format
          if (Array.isArray(response.data)) {
            this.industryDomainList = response.data.map((item: string) => ({ name: item }));
          } else {
            this.industryDomainList = response.data || [];
          }
        } else {
          console.error('Error fetching industry domains:', response.message);
        }
      },
      error: (error: any) => {
        console.error('API error fetching industry domains:', error);
      }
    });
  }

  // Search industry domains
  searchIndustryDomains(searchText: string): void {
    if (searchText) {
      this.superService.getSubExpertiseDropdownList(searchText).subscribe({
        next: (response: any) => {
          if (response.status) {
            // Handle array of strings format
            if (Array.isArray(response.data)) {
              this.industryDomainList = response.data.map((item: string) => ({ name: item }));
            } else {
              this.industryDomainList = response.data || [];
            }
          }
        },
        error: (error: any) => {
          console.error('API error searching industry domains:', error);
        }
      });
    } else {
      this.getIndustryDomains();
    }
  }

  // Setup rate calculation event listeners
  setupRateCalculations() {
    // Listen for changes in the CTC field
    this.userProfileForm.get('ctc')?.valueChanges.subscribe(ctcValue => {
      if (ctcValue) {
        this.calculateRatesFromCTC(this.parseNumericValue(ctcValue));
      }
    });

    // Listen for changes in the UK Hourly Rate field
    this.userProfileForm.get('ukHourlyRate')?.valueChanges.subscribe(rate => {
      if (rate && !this.userProfileForm.get('ctc')?.dirty) {
        this.calculateFromUKHourlyRate(this.parseNumericValue(rate));
      }
    });

    // Listen for changes in the UK Day Rate field
    this.userProfileForm.get('ukDayRate')?.valueChanges.subscribe(rate => {
      if (rate && !this.userProfileForm.get('ctc')?.dirty) {
        this.calculateFromUKDayRate(this.parseNumericValue(rate));
      }
    });

    // Listen for changes in the Indian Day Rate field
    this.userProfileForm.get('indianDayRate')?.valueChanges.subscribe(rate => {
      if (rate && !this.userProfileForm.get('ctc')?.dirty) {
        this.calculateFromIndianDayRate(this.parseNumericValue(rate));
      }
    });
  }

  // Fetch live exchange rate from API
  fetchExchangeRate() {
    this.superService.getPoundRate().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.exchangeRate = parseFloat(response.data.toFixed(2)); // Keep 2 decimal places for precision
          console.log(`Live exchange rate loaded: 1 GBP = ${this.exchangeRate} INR (exact)`);
          this.notificationService.showSuccess(`Using current exchange rate: 1 GBP = ${this.exchangeRate} INR`);

          // Recalculate rates if CTC is already entered
          const ctcValue = this.userProfileForm.get('ctc')?.value;
          if (ctcValue) {
            this.calculateRatesFromCTC(this.parseNumericValue(ctcValue));
          }
        }
      },
      (error: Error) => {
        console.error('Error fetching exchange rate:', error);
        this.notificationService.showError(`Could not fetch live exchange rate. Using default rate: 1 GBP = ${this.exchangeRate} INR`);
      }
    );
  }

  // Update calculation methods to handle text inputs with commas
  parseNumericValue(value: string | number): number {
    if (typeof value === 'string') {
      // Remove all non-numeric characters except decimal point
      return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    }
    return value || 0;
  }

  // Format number with commas for Indian currency format
  formatIndianCurrency(amount: number): string {
    if (!amount) return '';

    // Convert to string and split by decimal point
    const [integerPart, decimalPart] = amount.toFixed(2).toString().split('.');

    // Format integer part with commas (Indian format: 1,23,45,678)
    let formattedInteger = '';
    let i = integerPart.length;

    while (i > 0) {
      if (i > 3) {
        // For digits other than the last 3
        const chunkSize = (i - 3) > 0 && (i - 3) % 2 === 0 ? 2 : 1;
        formattedInteger = ',' + integerPart.substring(i - chunkSize, i) + formattedInteger;
        i -= chunkSize;
      } else {
        // For the last 3 digits
        formattedInteger = integerPart.substring(0, i) + formattedInteger;
        break;
      }
    }

    return formattedInteger + (decimalPart ? '.' + decimalPart : '');
  }

  // Format number with commas for UK currency format
  formatUKCurrency(amount: number): string {
    if (!amount) return '';
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Update the calculation methods to handle formatting
  calculateRatesFromCTC(ctc: number) {
    // Convert to GBP (pounds)
    const poundsEquivalent = ctc / this.exchangeRate;

    // Calculate UK Day Rate and UK Hourly Rate
    const poundsPerDay = poundsEquivalent / this.workingDaysPerYear;
    const ukDayRate = poundsPerDay * this.ukMultiplier;
    const ukHourlyRate = ukDayRate / this.hoursPerDay;

    // Calculate Indian Day Rate
    const indianDayRate = ctc / this.workingDaysPerYear;

    // Update the form values without triggering additional valueChanges events
    this.userProfileForm.patchValue({
      ukHourlyRate: this.formatUKCurrency(ukHourlyRate),
      ukDayRate: this.formatUKCurrency(ukDayRate),
      indianDayRate: this.formatIndianCurrency(indianDayRate)
    }, { emitEvent: false });
  }

  // Calculate rates from UK Hourly Rate
  calculateFromUKHourlyRate(ukHourlyRate: number) {
    const ukDayRate = ukHourlyRate * this.hoursPerDay;
    const poundsPerDay = ukDayRate / this.ukMultiplier;
    const poundsEquivalent = poundsPerDay * this.workingDaysPerYear;
    const ctc = poundsEquivalent * this.exchangeRate;
    const indianDayRate = ctc / this.workingDaysPerYear;

    this.userProfileForm.patchValue({
      ctc: this.formatIndianCurrency(ctc),
      ukDayRate: this.formatUKCurrency(ukDayRate),
      indianDayRate: this.formatIndianCurrency(indianDayRate)
    }, { emitEvent: false });
  }

  // Calculate rates from UK Day Rate
  calculateFromUKDayRate(ukDayRate: number) {
    const ukHourlyRate = ukDayRate / this.hoursPerDay;
    const poundsPerDay = ukDayRate / this.ukMultiplier;
    const poundsEquivalent = poundsPerDay * this.workingDaysPerYear;
    const ctc = poundsEquivalent * this.exchangeRate;
    const indianDayRate = ctc / this.workingDaysPerYear;

    this.userProfileForm.patchValue({
      ctc: this.formatIndianCurrency(ctc),
      ukHourlyRate: this.formatUKCurrency(ukHourlyRate),
      indianDayRate: this.formatIndianCurrency(indianDayRate)
    }, { emitEvent: false });
  }

  // Calculate rates from Indian Day Rate
  calculateFromIndianDayRate(indianDayRate: number) {
    const ctc = indianDayRate * this.workingDaysPerYear;
    const poundsEquivalent = ctc / this.exchangeRate;
    const poundsPerDay = poundsEquivalent / this.workingDaysPerYear;
    const ukDayRate = poundsPerDay * this.ukMultiplier;
    const ukHourlyRate = ukDayRate / this.hoursPerDay;

    this.userProfileForm.patchValue({
      ctc: this.formatIndianCurrency(ctc),
      ukHourlyRate: this.formatUKCurrency(ukHourlyRate),
      ukDayRate: this.formatUKCurrency(ukDayRate)
    }, { emitEvent: false });
  }
}



