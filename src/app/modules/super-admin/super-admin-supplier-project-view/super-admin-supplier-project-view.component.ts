import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';

@Component({
  selector: 'app-super-admin-supplier-project-view',
  templateUrl: './super-admin-supplier-project-view.component.html',
  styleUrls: ['./super-admin-supplier-project-view.component.scss']
})
export class SuperAdminSupplierProjectViewComponent {

  showLoader: boolean = false;
  projectList: any = [];

  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  dueDate: any;
  currentDate: Date = new Date();
  dateDifference: any;
  searchText: any;
  myControl = new FormControl();
  supplierData: any = []

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.supplierData = localStorage.getItem('supplierData');

    if (this.supplierData) {
      this.supplierData = JSON.parse(this.supplierData);
    } else {
      this.supplierData = []; // Set default value if no data found in localStorage
    }
    console.log(this.supplierData);

    this.myControl.valueChanges.subscribe((res: any) => {
      let storeTest = res;
      this.searchText = res.toLowerCase();
    });
    this.getProjectList();
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
    console.log(Payload.projectList);
    this.projectService.getProjectList(Payload.projectList).subscribe((response) => {
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
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  paginate(page: number) {
    this.page = page;
    this.getProjectList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
  projectDetails(projectId: any) {
     this.router.navigate(['/super-admin/super-admin-supplier-project-details'], { queryParams: { id: projectId } });
  }

}
