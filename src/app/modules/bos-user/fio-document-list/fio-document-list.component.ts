import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoiService } from 'src/app/services/foi-service/foi.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';

@Component({
  selector: 'app-fio-document-list',
  templateUrl: './fio-document-list.component.html',
  styleUrls: ['./fio-document-list.component.scss']
})
export class FioDocumentListComponent {

  showLoader: boolean = false;
  FOIList: any = [];
  searchText: any;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  dateDifference: any

  constructor(
    private foiService: FoiService,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFOIList();
  }

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} days`;
  }

  getFOIList() {
    this.showLoader = true;
    Payload.projectList.keyword = this.searchText;
    Payload.projectList.page = String(this.page);
    Payload.projectList.limit = String(this.pagesize);
    this.projectService.getProjectList(Payload.projectList).subscribe((response) => {
      this.FOIList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.FOIList = response?.data?.data;
        this.FOIList.forEach((project: any) => {
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
    this.projectService.getProjectList(Payload.projectList).subscribe((response) => {
      this.FOIList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.FOIList = response?.data?.data;
        console.log(this.FOIList);

        this.FOIList.forEach((project: any) => {
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




  foiDetails(projectID: any) {
    this.router.navigate(['/boss-user/view-project'], { queryParams: { id: projectID } });
  }

  addFoiDetails(projectID: any) {
    this.router.navigate(['/boss-user/foi-document-add'], { queryParams: { id: projectID } });
  }

  paginate(page: number) {
    this.page = page;
    this.getFOIList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
