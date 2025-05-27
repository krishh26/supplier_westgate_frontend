import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';
import { Options } from '@angular-slider/ngx-slider';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
@Component({
  selector: 'app-pm-shortlisted-projects',
  templateUrl: './pm-shortlisted-projects.component.html',
  styleUrls: ['./pm-shortlisted-projects.component.scss']
})
export class PmShortlistedProjectsComponent {
  showLoader: boolean = false;
  projectList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  searchText: any;
  supplierList: any = [];
  minValue: number = 0;
  maxValue: number = 50000000;
  options: Options = {
    floor: 0,
    ceil: 50000000
  };
  isExpired: boolean = false;
  categoryList: any = [];
  industryList: any = [];
  projectTypeList = [
    { projectType: 'Development', value: 'Development' },
    { projectType: 'Product', value: 'Product' },
    { projectType: 'Service', value: 'Service' }
  ];

  clientTypeList = [
    { clientType: 'Public Sector', value: 'PublicSector' },
    { clientType: 'Private Sector', value: 'PrivateSector' }
  ];

  statusList = [
    { value: 'Awaiting', status: 'Awaiting' },
    { value: 'InProgress', status: 'In-Progress' },
    { value: 'InHold', status: 'In Hold' },
    { value: 'Passed', status: 'Pass' },
    { value: 'Fail', status: 'Fail' },

    { value: 'InSolution', status: 'In solution' },
    { value: 'InReviewWestGate', status: 'In-review' },
    { value: 'InSubmission', status: 'In-Submission' },
    { value: 'Submitted', status: 'Submitted' },
    { value: 'Awarded', status: 'Awarded' },
    { value: 'NotAwarded', status: 'Not awarded' },
    { value: 'Dropped', status: 'Dropped' }
  ];

  selectedCategories: any[] = [];
  selectedIndustries: any[] = [];
  selectedProjectTypes: any[] = [];
  selectedClientTypes: any[] = [];
  selectedStatuses: any[] = [];
  selectedSuppliers: any[] = [];
  publishStartDate: FormControl = new FormControl('');
  publishEndDate: FormControl = new FormControl('');
  submissionStartDate: FormControl = new FormControl('');
  submissionEndDate: FormControl = new FormControl('');

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private superService: SuperadminService
  ) { }

  ngOnInit(): void {
    this.getIndustryList();
    this.getcategoryList();
    this.getProjectList();
    this.getsupplierList();
    this.publishEndDate.valueChanges.subscribe((res: any) => {
      if (!this.publishStartDate.value) {
        this.notificationService.showError('Please select a Publish start date');
        return
      } else {
        this.searchtext()
      }
    });
    this.submissionEndDate.valueChanges?.subscribe((res: any) => {
      if (!this.submissionStartDate.value) {
        this.notificationService.showError('Please select a Submission start date');
        return
      } else {
        this.searchtext()
      }
    });
  }

  // get project listing
  getProjectList() {
    this.showLoader = true;
    Payload.pmShortlistProjectList.keyword = this.searchText;
    Payload.pmShortlistProjectList.page = String(this.page);
    Payload.pmShortlistProjectList.limit = String(this.pagesize);
    Payload.pmShortlistProjectList.status = '';
    Payload.pmShortlistProjectList.sortlist = true;
    Payload.pmAllProjectList.match = 'partial';
    this.projectService.getProjectList(Payload.pmShortlistProjectList).subscribe((response) => {
      this.projectList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.projectList = response?.data?.data;

      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
      console.log('this.projectList', this.projectList)
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  searchtext() {
    this.showLoader = true;
    Payload.pmShortlistProjectList.keyword = this.searchText;
    Payload.pmShortlistProjectList.page = String(this.page);
    Payload.pmShortlistProjectList.limit = String(this.pagesize);
    Payload.pmShortlistProjectList.category = this.selectedCategories.join(',');
    Payload.pmShortlistProjectList.industry = this.selectedIndustries.join(',');
    Payload.pmShortlistProjectList.projectType = this.selectedProjectTypes.join(',');
    Payload.pmShortlistProjectList.clientType = this.selectedClientTypes.join(',');
    Payload.pmShortlistProjectList.status = this.selectedStatuses.join(',');
    Payload.pmShortlistProjectList.supplierId = this.selectedSuppliers.join(',');
    Payload.pmShortlistProjectList.publishDateRange = (this.publishStartDate.value && this.publishEndDate.value) ? `${this.publishStartDate.value.year}-${this.publishStartDate.value.month}-${this.publishStartDate.value.day} , ${this.publishEndDate.value.year}-${this.publishEndDate.value.month}-${this.publishEndDate.value.day}` : '';
    Payload.pmShortlistProjectList.SubmissionDueDateRange = (this.submissionStartDate.value && this.submissionEndDate.value) ? `${this.submissionStartDate.value.year}-${this.submissionStartDate.value.month}-${this.submissionStartDate.value.day} , ${this.submissionEndDate.value.year}-${this.submissionEndDate.value.month}-${this.submissionEndDate.value.day}` : '';
    Payload.pmShortlistProjectList.valueRange = this.minValue + '-' + this.maxValue;
    Payload.pmShortlistProjectList.expired = this.isExpired;
    this.projectService.getProjectList(Payload.pmShortlistProjectList).subscribe((response) => {
      this.projectList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.projectList = response?.data?.data;
        console.log(this.projectList);
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  getsupplierList() {
    this.showLoader = true;
    this.superService.getSupplierList().subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.supplierList = response?.data?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }


  projectDetails(projectId: any) {
    this.router.navigate(['/project-manager/project/shortlisted-project-details'], { queryParams: { id: projectId } });
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
        console.log(this.industryList);
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  paginate(page: number) {
    this.page = page;
    this.getProjectList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changeRange() {
    if (this.maxValue >= this.minValue) {
      this.searchtext();
    }
  }
}
