import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent {
  @ViewChild('downloadLink') private downloadLink!: ElementRef;
  showLoader: boolean = false;
  questionDetails: any = [];
  projectId: string = '';
  projectID: any;
  loginUser:any;
  projectDetails:any


  ngOnInit(): void {
    // this.getQuestionDetails();
    const details = localStorage.getItem('ViewQuestion');
    if(details) {
      this.questionDetails = JSON.parse(details);
      console.log('this.questionDetails', this.questionDetails)
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });

    this.loginUser = this.localStorageService.getLogger();
  }

  back() {
    if (this?.questionDetails?.projectId) {
      this.router.navigate(['/supplier-admin/projects-details'], { queryParams: { id: this?.questionDetails?.projectId } });
    } else {
      this.router.navigate(['/supplier-admin/project-list']);
    }
  }
}
