import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeasibilityService } from 'src/app/services/feasibility-user/feasibility.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-minimum-eligibility-form',
  templateUrl: './minimum-eligibility-form.component.html',
  styleUrls: ['./minimum-eligibility-form.component.scss']
})
export class MinimumEligibilityFormComponent implements OnInit {
  projectId: any;
  projectDetails: any;
  showLoader: boolean = false;
  showSuccess: boolean = false;

  eligibility = {
    caseStudyRequired: new FormControl("", Validators.required),
    certifications: new FormControl("", Validators.required),
    policy: new FormControl("", Validators.required),
  }

  eligibilityForm: FormGroup;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private feasibilityService: FeasibilityService,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.eligibilityForm = new FormGroup(this.eligibility);
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });
  }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.showLoader = true;
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        this.showSuccess = false;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  submit() {
    if (!this.eligibilityForm.valid) {
      return this.notificationService.showError('Please Fill Form.');
    }
  }

  submitEligibilityForm() {
    if (!this.eligibilityForm.valid) {
      return this.notificationService.showError('Please Fill Form.');
    }
    this.feasibilityService.updateProjectDetails(this.eligibilityForm.value, this.projectId).subscribe({
      next: (res: any) => {
        this.showSuccess = true;
        // this.router.navigate(['/feasibility-user/feasibility-project-list']);
      },
      error: (err: any) => {
        return this.notificationService.showError('Something went wrong');
      }
    })
  }
}
