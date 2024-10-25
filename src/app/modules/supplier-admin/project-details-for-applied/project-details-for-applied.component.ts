import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-project-details-for-applied',
  templateUrl: './project-details-for-applied.component.html',
  styleUrls: ['./project-details-for-applied.component.scss']
})
export class ProjectDetailsForAppliedComponent {

  @ViewChild('downloadLink') private downloadLink!: ElementRef;

  showLoader: boolean = false;
  projectDetails: any = [];
  projectId: string = '';
  projectID: any;
  dateDifference: any;
  currentDate: Date = new Date();
  selectedDocument: any;
  loginUser: any;
  summaryquestionList: any;
  pageType : number = 2;

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id'];
      this.pageType = params['type'] || 2;
    });

    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getProjectDetails();
    this.getSummaryQuestion()
  }

  sortListProject(projectId: string) {
    const payload = {
      userId: this.loginUser.id,
      projectId: projectId
    }
    this.projectService.projectSortList(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
        this.getProjectDetails();
      } else {
        return this.notificationService.showError(response?.message);
      }
    }, (error) => {
      return this.notificationService.showError(error?.message || 'Something went wrong !');
    })
  }

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} days`;
  }

  backPage() {
    this.router.navigate(['/supplier-admin/project-list'], { queryParams: { type: Number(this.pageType) } });
  }

  getProjectDetails() {
    this.showLoader = true;
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        const dueDate = new Date(this.projectDetails?.dueDate);
        const currentDate = new Date();
        const dateDifference = Math.abs(dueDate.getTime() - currentDate.getTime());
        const formattedDateDifference: string = this.formatMilliseconds(dateDifference);
        this.dateDifference = formattedDateDifference;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  getSummaryQuestion() {
    this.showLoader = true;
    this.projectService.getSummaryQuestionList(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.summaryquestionList = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  questionDetails(details: any) {
    localStorage.setItem('QuestionAnswerDetails', JSON.stringify(details));
    this.router.navigate(['/supplier-admin/question-answer-details'], { queryParams: { id: details?._id } });
  }


  openDocument(data: any) {
    this.selectedDocument = data;
  }

  download(imageUrl: string, fileName: string): void {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // You can customize the filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  applyProject() {
    const payload = {
      userId: this.loginUser.id,
      projectId: this.projectId
    }
    this.projectService.projectApply(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
      } else {
        return this.notificationService.showError(response?.message);
      }
    }, (error) => {
      return this.notificationService.showError(error?.message || 'Something went wrong !');
    })
  }
}
