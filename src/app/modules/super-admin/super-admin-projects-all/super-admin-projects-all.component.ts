import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';
import { BossUserBulkEntryComponent } from '../../bos-user/boss-user-bulk-entry/boss-user-bulk-entry.component';

@Component({
  selector: 'app-super-admin-projects-all',
  templateUrl: './super-admin-projects-all.component.html',
  styleUrls: ['./super-admin-projects-all.component.scss']
})
export class SuperAdminProjectsAllComponent {
  showLoader: boolean = false;
  projectList: any = [];
  categoryList: any = [];
  industryList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  searchText: any;
  myControl = new FormControl();
  minValue: number = 0;
  maxValue: number = 50000000;
  options: Options = {
    floor: 0,
    ceil: 50000000
  };
  loginUser: any;
  dateDifference: any;
  selectedCategories: any[] = [];
  selectedIndustries: any[] = [];
  selectedProjectTypes: any[] = [];
  selectedClientTypes: any[] = [];
  selectedStatuses: any[] = [];

  isExpired: boolean = false;

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
    { value: 'Fail', status: 'Fail' }
  ];

  publishStartDate: FormControl = new FormControl('');
  publishEndDate: FormControl = new FormControl('');
  submissionStartDate: FormControl = new FormControl('');
  submissionEndDate: FormControl = new FormControl('');

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private superService: SuperadminService,
    private modalService: NgbModal,
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
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

  openAddTeamModal() {
    this.modalService.open(BossUserBulkEntryComponent, { size: 'xl' });
  }

  editProjectDetails(projectId: any) {
    this.router.navigate(['/super-admin/super-admin-add-project'], { queryParams: { id: projectId } });
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
    Payload.projectList.keyword = this.searchText;
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    this.projectService.getProjectList(Payload.projectList).subscribe((response) => {
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

  searchtext() {
    this.showLoader = true;
    Payload.projectList.keyword = this.searchText;
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    Payload.projectList.category = this.selectedCategories.join(',');
    Payload.projectList.industry = this.selectedIndustries.join(',');
    Payload.projectList.projectType = this.selectedProjectTypes.join(',');
    Payload.projectList.clientType = this.selectedClientTypes.join(',');
    Payload.projectList.status = this.selectedStatuses.join(',')
    Payload.projectList.publishDateRange = (this.publishStartDate.value && this.publishEndDate.value) ? `${this.publishStartDate.value.year}-${this.publishStartDate.value.month}-${this.publishStartDate.value.day} , ${this.publishEndDate.value.year}-${this.publishEndDate.value.month}-${this.publishEndDate.value.day}` : '';
    Payload.projectList.SubmissionDueDateRange = (this.submissionStartDate.value && this.submissionEndDate.value) ? `${this.submissionStartDate.value.year}-${this.submissionStartDate.value.month}-${this.submissionStartDate.value.day} , ${this.submissionEndDate.value.year}-${this.submissionEndDate.value.month}-${this.submissionEndDate.value.day}` : '';
    Payload.projectList.valueRange = this.minValue + '-' + this.maxValue;
    Payload.projectList.expired = this.isExpired;
    this.projectService.getProjectList(Payload.projectList).subscribe((response) => {
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

  isDesc: boolean = false;
  column: string = 'publishDate';

  sort(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.projectList.sort(function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  createddatesort(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.projectList.sort(function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  duedatesort(property: any) {
    this.isDesc = !this.isDesc;
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.projectList.sort(function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

  projectDetails(projectId: any) {
    this.router.navigate(['/super-admin/super-admin-project-details'], { queryParams: { id: projectId } });
  }

  paginate(page: number) {
    this.page = page;
    this.getProjectList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sortListProject(projectId: string) {
    const payload = {
      userId: this.loginUser.id,
      projectId: projectId
    }
    this.projectService.projectSortList(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
        this.getProjectList();
      } else {
        return this.notificationService.showError(response?.message);
      }
    }, (error) => {
      return this.notificationService.showError(error?.message || 'Something went wrong !');
    })
  }

  changeRange() {
    if (this.maxValue >= this.minValue) {
      this.searchtext();
    }
  }

}
