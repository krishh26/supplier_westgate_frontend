import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';

@Component({
  selector: 'app-add-case-study',
  templateUrl: './add-case-study.component.html',
  styleUrls: ['./add-case-study.component.scss']
})
export class AddCaseStudyComponent {

  addEditProjectForm = {
    name: new FormControl("", Validators.required),
    clientName: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
    industry: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    problem: new FormControl("", Validators.required),
    solutionProvided: new FormControl("", Validators.required),
    technologies: new FormControl("", Validators.required),
    resourcesUsed: new FormControl("", Validators.required),
   // contractValue: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    contractDuration: new FormControl("", Validators.required),
    resultAchieved: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),
   // lessonsLearned: new FormControl("", Validators.required),
  }

  productForm: FormGroup = new FormGroup(this.addEditProjectForm);
  showLoader: boolean = false;
  projectId: string = '';
  categoryList: any = [];
  industryList: any = [];
  supplierData: any = [];
  technologiesList: any[] = [];
  supplierID: string = '';
  industryDomainList: any[] = [];

  data:any;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private superService: SuperadminService,
    private supplierService: SupplierAdminService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { caseStudy: any, isEdit: boolean };

    if (state?.caseStudy) {
      this.data = state.caseStudy;
      this.productForm.patchValue(this.data);
    }
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem("supplierData");
    if (storedData) {
      this.supplierData = JSON.parse(storedData);
      this.supplierID = this.supplierData?._id;
    } else {
      console.log("No supplier data found in localStorage");
    }
    this.getcategoryList();
    this.getIndustryList();
    this.getTechnologies();
    this.getIndustryDomains();
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });
    if (this.projectId && this.projectId.length) {
      this.patchProjectValue()
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

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  patchProjectValue() {
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      this.productForm.patchValue(response?.data)
    },
      error => {
        this.notificationService.showError(error?.error?.message);
        this.showLoader = false;
      })
  }

  getcategoryList() {
    this.showLoader = true;
    this.superService.getCategoryList().subscribe((response) => {
      if (response?.message == "category fetched successfully") {
        this.showLoader = false;
        this.categoryList = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  getIndustryList() {
    this.showLoader = true;
    this.superService.getIndustryList().subscribe((response) => {
      if (response?.message == "Industry fetched successfully") {
        this.showLoader = false;
        this.industryList = response?.data;

      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }


  submitForm() {
    if (this.data) {
      const payload = {
        ...this.data,
        ...this.productForm.value,
      };
      this.showLoader = true;
      // Make sure we're passing the correct ID
      const caseStudyId = this.data._id || this.data.id;
      if (!caseStudyId) {
        this.notificationService.showError('Case Study ID is missing');
        this.showLoader = false;
        return;
      }

      this.supplierService.updateCaseStudy(payload, caseStudyId).subscribe(
        (response) => {
          if (response?.status === true) {
            this.showLoader = false;
            this.notificationService.showSuccess('', 'Case Study updated successfully.');
            this.router.navigate(['/supplier-admin/case-studies-list']);
          } else {
            this.notificationService.showError(response?.message);
            this.showLoader = false;
          }
        },
        (error) => {
          this.notificationService.showError(error?.error?.message);
          this.showLoader = false;
        }
      );
      return;
    }

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.showLoader = true;
    const payload = {
      ...this.productForm.value,
      userId: this.supplierID
    };

    this.supplierService.addCaseStudy(payload).subscribe(
      (response) => {
        if (response?.status === true) {
          this.showLoader = false;
          this.notificationService.showSuccess('', 'Case Study added successfully.');
          this.router.navigate(['/supplier-admin/case-studies-list']);
        } else {
          this.notificationService.showError(response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message);
        this.showLoader = false;
      }
    );
  }


}
