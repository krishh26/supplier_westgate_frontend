import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';

@Component({
  selector: 'app-resources-add',
  templateUrl: './resources-add.component.html',
  styleUrls: ['./resources-add.component.scss']
})
export class ResourcesAddComponent {

  // Form controls for the user profile
  userProfileForm: FormGroup = this.fb.group({});

  // Arrays to store tag-like inputs
  previousEmployers: string[] = [];
  technicalSkills: string[] = [];
  softSkills: string[] = [];
  languagesKnown: string[] = [];

  // Temporary inputs for tag-like fields
  newEmployer: string = '';
  newTechnicalSkill: string = '';
  newSoftSkill: string = '';
  newLanguage: string = '';

  // Arrays to store project tech stacks
  projectTechStacks: string[][] = [[]];
  newTechStack: string = '';

  // Dropdown options
  genderOptions = ['Male', 'Female', 'Other'];
  languageOptions = [
    'Spoken', 'Written languages'
  ];
  projectComplexityOptions = ['Simple', 'Medium', 'Complex'];

  showLoader: boolean = false;
  supplierID: string = '';
  supplierData: any = [];
  rolesList: any[] = [];

  // Add a class property to store the candidate ID if in edit mode
  candidateId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private superService: SuperadminService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) {
    this.initializeForm();
    this.getRolesList();
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem("supplierData");
    if (storedData) {
      this.supplierData = JSON.parse(storedData);
      this.supplierID = this.supplierData?._id;
      this.userProfileForm.patchValue({
        supplierId: this.supplierID
      });
    } else {
      console.log("No supplier data found in localStorage");
    }

    // Check if we're in edit mode by looking for candidateId in query params
    this.route.queryParams.subscribe(params => {
      if (params['candidateId']) {
        this.candidateId = params['candidateId'];
        // Load candidate data from localStorage instead of API
        this.loadCandidateDataFromStorage();
      }
    });
  }

  initializeForm() {
    this.userProfileForm = this.fb.group({
      supplierId: [''],
      fullName: ['', Validators.required],
      gender: [''],
      nationality: ['', Validators.required],
      highestQualification: ['', Validators.required],
      yearOfGraduation: [''],
      totalExperience: ['', [Validators.required, Validators.min(0)]],
      // jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      keyResponsibilities: ['', Validators.required],
      availableFrom: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      // workingHoursPerWeek: ['', [Validators.required, Validators.min(0), Validators.max(168)]],
      // overtimeCharges: [''],
      roleId: [[], Validators.required],
      //  otherJobTitle: [''],
      projectsWorkedOn: this.fb.array([this.createProjectForm()])
    });
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

  addTechnicalSkill(): void {
    if (this.newTechnicalSkill?.trim() && !this.technicalSkills.includes(this.newTechnicalSkill.trim())) {
      this.technicalSkills.push(this.newTechnicalSkill.trim());
      this.newTechnicalSkill = '';
    }
  }

  removeTechnicalSkill(index: number): void {
    this.technicalSkills.splice(index, 1);
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

  addTechStack(projectIndex: number): void {
    if (this.newTechStack?.trim() && !this.projectTechStacks[projectIndex].includes(this.newTechStack.trim())) {
      this.projectTechStacks[projectIndex].push(this.newTechStack.trim());
      this.newTechStack = '';
    }
  }

  removeTechStack(projectIndex: number, techIndex: number): void {
    this.projectTechStacks[projectIndex].splice(techIndex, 1);
  }

  // Form submission
  submitForm(): void {
    if (this.userProfileForm.invalid || this.technicalSkills.length === 0) {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.userProfileForm);
      if (this.technicalSkills.length === 0) {
        this.notificationService.showError('Technical Skills are required');
      }
      return;
    }

    // Ensure at least one role is selected
    const selectedRoles = this.userProfileForm.get('roleId')?.value;
    if (!selectedRoles || selectedRoles.length === 0) {
      this.notificationService.showError('At least one role must be selected');
      return;
    }

    // Prepare the data in the required format
    const formData = this.userProfileForm.value;

    // Make sure we're using the current supplierId
    formData.supplierId = this.supplierID;

    // Add the array fields that are managed separately
    const userData = {
      ...formData,
      previousEmployers: this.previousEmployers,
      technicalSkills: this.technicalSkills,
      softSkills: this.softSkills,
      languagesKnown: this.languagesKnown
    };

    // Add tech stack to each project and handle null projectComplexity
    userData.projectsWorkedOn = userData.projectsWorkedOn.map((project: any, index: number) => {
      const { projectComplexity, ...projectWithoutComplexity } = project;  // Destructure to remove projectComplexity
      return {
        ...projectWithoutComplexity,
        techStackUsed: this.projectTechStacks[index]
      };
    });

    // Format the data as requested
    const finalData = {
      data: [userData]
    };

    // Log the data to console
    console.log('User Profile Data:', finalData);

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

      console.log('Update data:', updateData);

      // Update existing candidate
      this.superService.updateCandidate(this.candidateId, updateData).subscribe(
        (response: any) => {
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
        (error: any) => {
          console.error('Update error:', error);
          this.showLoader = false;
          this.notificationService.showError(error.message || 'An error occurred while updating candidate profile');
        }
      );
    } else {
      // Create new candidate
      this.superService.addCandidate(finalData).subscribe(
        (response: any) => {
          this.showLoader = false;
          if (response.status) {
            this.notificationService.showSuccess('Candidate profile added successfully');
            this.router.navigate(['/supplier-admin/role-wise-resources-list']);
          } else {
            this.notificationService.showError(response.message || 'Failed to add candidate profile');
          }
        },
        (error: any) => {
          this.showLoader = false;
          this.notificationService.showError(error.message || 'An error occurred while adding candidate profile');
        }
      );
    }
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

  // Number validation for input fields
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getRolesList() {
    this.superService.getRolesList().subscribe({
      next: (response: any) => {
        if (response && response.status) {
          this.rolesList = response?.data?.roles || [];
        } else {
          this.notificationService.showError(response?.message || 'Failed to fetch roles');
        }
      },
      error: (error: any) => {
        this.notificationService.showError(error?.message || 'An error occurred while fetching roles');
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

      // Patch the form with candidate data
      this.userProfileForm.patchValue({
        supplierId: candidateData.supplierId,
        fullName: candidateData.fullName,
        gender: candidateData.gender,
        nationality: candidateData.nationality,
        highestQualification: candidateData.highestQualification,
        yearOfGraduation: candidateData.yearOfGraduation,
        totalExperience: candidateData.totalExperience,
        startDate: candidateData.startDate,
        keyResponsibilities: candidateData.keyResponsibilities,
        availableFrom: this.formatDateForInput(candidateData.availableFrom),
        hourlyRate: candidateData.hourlyRate,
        roleId: roleIds
      });

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
}
