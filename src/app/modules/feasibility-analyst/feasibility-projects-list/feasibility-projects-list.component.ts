import { Options } from '@angular-slider/ngx-slider/options';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';

interface Project {
  _id: string;
  projectName: string;
  description: string;
  category: string;
  industry: string;
  minValue: number;
  maxValue: number
  projectType: string;
  status: string;
  dueDate: Date;
  // Add other properties as needed
}

@Component({
  selector: 'app-feasibility-projects-list',
  templateUrl: './feasibility-projects-list.component.html',
  styleUrls: ['./feasibility-projects-list.component.scss']
})
export class FeasibilityProjectsListComponent {

  showLoader: boolean = false;
  projectList: any = [];
  isExpired: boolean = false;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  dueDate: any;
  currentDate: Date = new Date();
  dateDifference: any;
  searchText: any;
  myControl = new FormControl();
  categoryList: any = [];
  industryList: any = [];
  // statusList: any = [
  //   "Awaiting",
  //   "⁠Documents not found",
  //   "⁠Dropped",
  //   "⁠Dropped after feasibility",
  //   "⁠Failed",
  //   "⁠Handovered to other supplier",
  //   "⁠Passed",
  //   "⁠Submitted"
  // ];

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
    private superService: SuperadminService
  ) { }

  ngOnInit(): void {
    this.myControl.valueChanges.subscribe((res: any) => {
      let storeTest = res;
      this.searchText = res.toLowerCase();
    });
    this.getCategoryList();
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

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days} days`;
  }

  getCategoryList() {
    this.showLoader = true;
    this.superService.getCategoryList().subscribe(
      (response) => {
        if (response?.status && response?.message === "category fetched successfully") {
          this.categoryList = response.data;
          this.showLoader = false;
        } else {
          console.error('Failed to fetch categories:', response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.showLoader = false;
      }
    );
  }

  getIndustryList() {
    this.showLoader = true;
    this.superService.getIndustryList().subscribe(
      (response) => {
        if (response?.status && response?.message === "Industry fetched successfully") {
          this.industryList = response.data;
          this.showLoader = false;
        } else {
          console.error('Failed to fetch industries:', response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        console.error('Error fetching industries:', error);
        this.showLoader = false;
      }
    );
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

  getProjectList() {
    this.showLoader = true;
    Payload.projectList.keyword = this.searchText;
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    Payload.projectList.match = 'partial';
    this.projectService.getProjectList(Payload.projectList).subscribe((response) => {
      this.projectList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.projectList = response?.data?.data;
        console.log(this.projectList);
        this.totalRecords = response?.data?.meta_data?.items;

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

    // Update payload with filters
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
    console.log(Payload.projectList);
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

  projectDetails(projectId: any) {
    this.router.navigate(['/feasibility-user/feasibility-project-detail'], { queryParams: { id: projectId } });
  }

  editProjectDetails(projectId: any) {
    this.router.navigate(['/feasibility-user/edit-feasibility-project-details'], { queryParams: { id: projectId } });
  }

  paginate(page: number) {
    this.page = page;
    this.getProjectList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  editProject(projectId: string) {
    console.log('Edit project with ID:', projectId);
  }

  toggleEditMode(item: any) {
    item.isEditing = !item.isEditing;
  }

  saveProject(item: Project) {
    const payload = {
      projectName: item.projectName,
      description: item.description,
      category: item.category,
      industry: item.industry,
      minValue: item.minValue,
      maxValue: item.maxValue,
      projectType: item.projectType,
      status: item.status,
      dueDate: item.dueDate
      // Add other fields as necessary
    };
    this.projectService.editProject(item._id, payload).subscribe(
      (response) => {
        if (response?.status === true) {
          this.notificationService.showSuccess('Project updated successfully');
          // window.location.reload();
          this.getProjectList();
        } else {
          this.notificationService.showError(response?.message || 'Failed to update project');
        }
      },
      (error) => {
        this.notificationService.showError('Failed to update project');
      }
    );
  }

  getCategoryName(categoryId: string): string {
    const foundCategory = this.categoryList.find((category: any) => category._id === categoryId);
    return foundCategory ? foundCategory.category : '';
  }

  getIndustryName(industryId: string): string {
    const foundIndustry = this.industryList.find((industry: any) => industry._id === industryId);
    return foundIndustry ? foundIndustry.industry : '';
  }

  // Number only validation
  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  changeRange() {
    if (this.maxValue >= this.minValue) {
      this.searchtext();
    }
  }

}
