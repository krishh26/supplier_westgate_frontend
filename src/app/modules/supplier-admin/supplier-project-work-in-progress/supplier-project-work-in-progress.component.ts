import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';

@Component({
  selector: 'app-supplier-project-work-in-progress',
  templateUrl: './supplier-project-work-in-progress.component.html',
  styleUrls: ['./supplier-project-work-in-progress.component.scss']
})
export class SupplierProjectWorkInProgressComponent {
  showLoader: boolean = false;
  projectList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  searchText: any;
  loginUser: any;
  currentUserId: string = '';
  minValue: number = 0;
  maxValue: number = 50000000;
  options: Options = {
    floor: 0,
    ceil: 50000000
  };

  selectedCategories: any[] = [];
  selectedIndustries: any[] = [];
  selectedProjectTypes: any[] = [];
  selectedClientTypes: any[] = [];
  selectedStatuses: any[] = [];
  selectedBidStatuses: any[] = [];

  projectTypeList = [
    { projectType: 'Development', value: 'Development' },
    { projectType: 'Product', value: 'Product' },
    { projectType: 'Service', value: 'Service' }
  ];

  clientTypeList = [
    { clientType: 'Public Sector', value: 'PublicSector' },
    { clientType: 'Private Sector', value: 'PrivateSector' }
  ];

  isExpired: boolean = false;
  statusList = [
    { value: 'In solution', supplierStatus: 'In solution' },
    { value: 'In-review', supplierStatus: 'In-review' },
    { value: 'In-Submission', supplierStatus: 'In-Submission' },
    { value: 'Submitted', supplierStatus: 'Submitted' },
    { value: 'Awarded', supplierStatus: 'Awarded' },
    { value: 'Not awarded', supplierStatus: 'Not awarded' },
    { value: 'Dropped', supplierStatus: 'Dropped' }
  ];

  bidstatusList = [
    // { bidvalue: 'Awaiting', bidstatus: 'Awaiting' },
    { bidvalue: 'InSolution', bidstatus: 'In Solution' },
    { bidvalue: 'NotAwarded', bidstatus: 'Not Awarded' },
    { bidvalue: 'Awarded', bidstatus: 'Awarded' },
    // { bidvalue: 'DroppedAfterFeasibility', bidstatus: 'Dropped after feasibility' },
    { bidvalue: 'WaitingForResult', bidstatus: 'Waiting For Result' },
    // { bidvalue: 'Nosuppliermatched', bidstatus: 'No Supplier Matched' }
  ]

  viewComments: any;
  categoryList: any = [];
  industryList: any = [];
  myControl = new FormControl();
  publishStartDate: FormControl = new FormControl('');
  publishEndDate: FormControl = new FormControl('');
  submissionStartDate: FormControl = new FormControl('');
  submissionEndDate: FormControl = new FormControl('');
  dateDifference: any;
  private payload: any = {};

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private superService: SuperadminService,
    private localStorageService: LocalStorageService,
  ) {
    this.loginUser = this.localStorageService.getLogger();
    if (this.loginUser && this.loginUser._id) {
      this.currentUserId = this.loginUser._id;
    }
  }

  ngOnInit(): void {
    this.payload = this.superService.deepCopy(Payload.projectList);
    this.myControl.valueChanges.subscribe((res: any) => {
      let storeTest = res;
      this.searchText = res.toLowerCase();
    });
    this.getcategoryList();
    this.getIndustryList();
    this.getProjectList();
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

  showComments(data: any) {
    console.log('this is my view comment', data);
    this.viewComments = data;
  }

  changeRange() {
    if (this.maxValue >= this.minValue) {
      this.searchtext();
    }
  }


  searchtext() {
    this.showLoader = true;
    this.payload.keyword = this.searchText;
    this.payload.page = String(this.page);
    this.payload.limit = String(this.pagesize);
    // this.payload.category = this.selectedCategories.join(',');
    // this.payload.industry = this.selectedIndustries.join(',');
    // this.payload.projectType = this.selectedProjectTypes.join(',');
    // this.payload.clientType = this.selectedClientTypes.join(',');
    // this.payload.supplierStatus = this.selectedStatuses.join(',');
    //this.payload.status = 'Passed';
    this.payload.bidManagerStatus = this.selectedBidStatuses.join(',')
    this.payload.publishDateRange = (this.publishStartDate.value && this.publishEndDate.value) ? `${this.publishStartDate.value.year}-${this.publishStartDate.value.month}-${this.publishStartDate.value.day} , ${this.publishEndDate.value.year}-${this.publishEndDate.value.month}-${this.publishEndDate.value.day}` : '';
    this.payload.SubmissionDueDateRange = (this.submissionStartDate.value && this.submissionEndDate.value) ? `${this.submissionStartDate.value.year}-${this.submissionStartDate.value.month}-${this.submissionStartDate.value.day} , ${this.submissionEndDate.value.year}-${this.submissionEndDate.value.month}-${this.submissionEndDate.value.day}` : '';
    this.payload.valueRange = this.minValue + '-' + this.maxValue;
    this.payload.expired = this.isExpired;
    this.projectService.getProjectList(this.payload).subscribe((response) => {
      this.projectList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.projectList = response?.data?.data;
        console.log(this.projectList);

        this.projectList.forEach((project: any) => {
          const dueDate = new Date(project.dueDate);
          const currentDate = new Date();
          const dateDifference = Math.abs(dueDate.getTime() - currentDate.getTime());

          const formattedDateDifference: string = this.formatMilliseconds(dateDifference);
          this.dateDifference = formattedDateDifference;
        });
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} days`;
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
      this.notificationService.showError(error?.message);
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
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  getProjectList() {
    this.showLoader = true;
    this.payload.keyword = this.searchText;
    this.payload.page = String(this.page);
    this.payload.limit = String(this.pagesize);
    // this.payload.applied = true;
    this.payload.sortlist = false;
    this.payload.expired = true;
    // this.payload.workInProgress = true;
    // this.payload.match = "partial";
    this.payload.supplierId = this.loginUser?._id
    this.payload.bidManagerStatus = "InSolution,WaitingForResult";
    this.projectService.getProjectList(this.payload).subscribe((response) => {
      this.projectList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.projectList = response?.data?.data;

      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  projectDetails(projectId: any) {
    this.router.navigate(['supplier-admin/projects-details'], { queryParams: { id: projectId, type: 4 } });
  }

  paginate(page: number) {
    this.page = page;
    this.getProjectList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getDropReasonForCurrentUser(dropUsers: any[]): string {
    if (!dropUsers || !dropUsers.length || !this.currentUserId) {
      return '';
    }

    const currentUserDropInfo = dropUsers.find(drop => drop.userId === this.currentUserId);
    if (currentUserDropInfo && currentUserDropInfo.reason && currentUserDropInfo.reason.length > 0) {
      return currentUserDropInfo.reason[0].comment;
    }

    return '';
  }
}
