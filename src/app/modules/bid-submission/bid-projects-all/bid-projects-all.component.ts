import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';


@Component({
  selector: 'app-bid-projects-all',
  templateUrl: './bid-projects-all.component.html',
  styleUrls: ['./bid-projects-all.component.scss']
})
export class BidProjectsAllComponent {
  showLoader: boolean = false;
  projectList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  searchText: FormControl = new FormControl('');
  loginUser: any;

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.searchText.valueChanges.pipe(debounceTime(500)).subscribe((result) => {
      console.log('result', result);
      this.getProjectList();
    });
    this.getProjectList();
  }

  getProjectList() {
    this.showLoader = true;
    Payload.projectList.keyword = String(this.searchText?.value) || "";
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    Payload.projectList.applied = false;
    Payload.projectList.sortlist = false;
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
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  supplierDetails(projectId: any) {
    this.router.navigate(['/uk-writer/uk-writer-supplier-list'], { queryParams: { id: projectId } });
    localStorage.setItem('UKprojectID' ,projectId )
  }

  projectDetails(projectId: any) {
    this.router.navigate(['/bid-submission/bid-projects-details'], { queryParams: { id: projectId } });
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
      return this.notificationService.showError(error?.error?.message || 'Something went wrong !');
    })
  }

}
