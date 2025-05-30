import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-summary-notes',
  templateUrl: './summary-notes.component.html',
  styleUrls: ['./summary-notes.component.scss']
})
export class SummaryNotesComponent implements OnInit {
  summaryQuestionList: any[] = [];
  showLoader: boolean = false;
  projectId: string = "";
  loginUser: any;

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router : Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });

    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getSummaryQuestion();
  }

  getSummaryQuestion() {
    if (!this.projectId) {
      return this.notificationService.showError('Project Id Not Found.');
    }
    this.showLoader = true;
    this.projectService.getSummaryQuestionList(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.summaryQuestionList = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  openSummaryDetail(item:any){
    localStorage.setItem('ViewSummary', JSON.stringify(item));
    this.router.navigate(['/project-manager/project/summary-project-details']);
  }

  backPage() {
    this.router.navigate(['/project-manager/project/match-project-details'], { queryParams: { id: this.projectId } });
  }
}
