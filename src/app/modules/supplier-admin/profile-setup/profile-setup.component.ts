import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 7;
  profileForm!: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';

  steps = [
    { number: 1, title: 'Profile Setup', completed: false, active: true },
    { number: 2, title: 'Technology Stack & Services', completed: false, active: false },
    { number: 3, title: 'Core Services & Capabilities', completed: false, active: false },
    { number: 4, title: 'Infrastructure, Integration & Security', completed: false, active: false },
    { number: 5, title: 'Data, Intelligence & Automation', completed: false, active: false },
    { number: 6, title: 'Enterprise Systems & Business Apps', completed: false, active: false },
    { number: 7, title: 'Front-End, Composable & Emerging Tech', completed: false, active: false }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private supplierAdminService: SupplierAdminService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // Load saved form data from localStorage
    const savedFormData = localStorage.getItem('profileSetupFormData');
    const savedStep = localStorage.getItem('profileSetupCurrentStep');

    if (savedFormData) {
      this.profileForm.patchValue(JSON.parse(savedFormData));
    }

    if (savedStep) {
      const step = parseInt(savedStep);
      if (step > 1) {
        for (let i = 1; i < step; i++) {
          this.steps[i - 1].completed = true;
          this.steps[i - 1].active = false;
        }
        this.currentStep = step;
        this.steps[step - 1].active = true;
      }
    }
  }

  // Save form data to localStorage whenever it changes
  private saveFormData(): void {
    localStorage.setItem('profileSetupFormData', JSON.stringify(this.profileForm.value));
    localStorage.setItem('profileSetupCurrentStep', this.currentStep.toString());
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      // Step 1: Company Details
      companyName: [''],
      companyWebsite: [''],
      companyAddress: [''],
      country: [''],
      contactEmail: [''],
      contactNumber: [''],
      establishedYear: [''],
      executiveSummary: [''],

      // POC Details
      pocName: [''],
      pocPhone: [''],
      pocEmail: [''],
      pocRole: [''],

      // Business Details
      businessType: [''],
      companySize: [''],
      turnover: [''],
      totalProjectsExecuted: [''],
      certification: [''],

      // Step 2: Technology Stack & Services
      expertise: [[]],
      services: [[]],
      technologyStack: [[]],

      // Step 3: Core Services & Capabilities
      cloudPlatforms: [[]],
      devOpsAutomation: [[]],
      containerizationOrchestration: [[]],

      // Step 4: Infrastructure, Integration & Security
      networkingInfrastructure: [[]],
      securityIAM: [[]],
      monitoringObservability: [[]],
      integrationAPI: [[]],
      eventStreaming: [[]],

      // Step 5: Data, Intelligence & Automation
      databasePlatforms: [[]],
      dataAnalyticsBI: [[]],
      aiMLPlatforms: [[]],

      // Step 6: Enterprise Systems & Business Apps
      erpEnterpriseSystems: [[]],
      crmCustomerPlatforms: [[]],
      itsmItOperations: [[]],
      businessAppsProductivity: [[]],

      // Step 7: Front-End, Composable & Emerging Tech
      eCommerceCMS: [[]],
      learningHRSystems: [[]],
      lowCodeNoCodePlatforms: [[]],
      testingQA: [[]],
      web3DecentralizedTech: [[]]
    });

    // Save form data whenever it changes
    this.profileForm.valueChanges.subscribe(() => {
      this.saveFormData();
    });
  }

  nextStep() {
    this.submitted = true;

    // Check if current step form is valid
    if (this.isCurrentStepValid()) {
      if (this.currentStep < this.totalSteps) {
        this.steps[this.currentStep - 1].completed = true;
        this.steps[this.currentStep - 1].active = false;
        this.currentStep++;
        this.steps[this.currentStep - 1].active = true;
        this.submitted = false;
        this.saveFormData(); // Save after step change
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.steps[this.currentStep - 1].active = false;
      this.currentStep--;
      this.steps[this.currentStep - 1].active = true;
      this.steps[this.currentStep - 1].completed = false;
      this.submitted = false;
      this.saveFormData(); // Save after step change
    }
  }

  isCurrentStepValid(): boolean {
    const stepValidations = {
      1: ['companyName', 'companyWebsite', 'companyAddress', 'country', 'contactEmail', 'contactNumber', 'establishedYear', 'executiveSummary', 'pocName', 'pocPhone', 'pocEmail', 'pocRole', 'businessType', 'companySize', 'turnover', 'totalProjectsExecuted', 'certification'],
      2: ['expertise', 'services', 'technologyStack'],
      3: ['cloudPlatforms', 'devOpsAutomation', 'containerizationOrchestration'],
      4: ['networkingInfrastructure', 'securityIAM', 'monitoringObservability', 'integrationAPI', 'eventStreaming'],
      5: ['databasePlatforms', 'dataAnalyticsBI', 'aiMLPlatforms'],
      6: ['erpEnterpriseSystems', 'crmCustomerPlatforms', 'itsmItOperations', 'businessAppsProductivity'],
      7: ['eCommerceCMS', 'learningHRSystems', 'lowCodeNoCodePlatforms', 'testingQA', 'web3DecentralizedTech']
    };

    const fieldsToValidate = stepValidations[this.currentStep as keyof typeof stepValidations] || [];
    return fieldsToValidate.every(field => {
      const control = this.profileForm.get(field);
      return control && !control.errors;
    });
  }

  getProgressPercentage(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.profileForm.valid) {
      this.loading = true;
      this.supplierAdminService.submitProfileSetup(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Profile setup submitted successfully:', response);
          this.loading = false;
          this.successMessage = 'Profile setup completed successfully!';
          // Clear saved form data after successful submission
          localStorage.removeItem('profileSetupFormData');
          localStorage.removeItem('profileSetupCurrentStep');
          setTimeout(() => {
            this.router.navigate(['/supplier-admin/supplier-dashboard']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error submitting profile setup:', error);
          this.loading = false;
          this.errorMessage = error.error?.message || 'An error occurred while submitting the profile setup. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  // Helper method to check if a field is invalid
  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.submitted)) : false;
  }
}
