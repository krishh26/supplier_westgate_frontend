import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UkWriterService } from 'src/app/services/uk-writer/uk-writer.service';

@Component({
  selector: 'app-uk-writer-home',
  templateUrl: './uk-writer-home.component.html',
  styleUrls: ['./uk-writer-home.component.scss']
})
export class UkWriterHomeComponent {

  ukwriterdashboardlist: any = [];
  showLoader: boolean = false;

  constructor(
    private ukwriterService: UkWriterService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.showLoader = true;
    this.ukwriterService.getDashboardData().subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.ukwriterdashboardlist = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

}
