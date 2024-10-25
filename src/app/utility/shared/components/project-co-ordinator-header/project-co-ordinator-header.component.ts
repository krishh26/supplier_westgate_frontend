import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-project-co-ordinator-header',
  templateUrl: './project-co-ordinator-header.component.html',
  styleUrls: ['./project-co-ordinator-header.component.scss']
})
export class ProjectCoOrdinatorHeaderComponent {

  loginUser: any;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public router: Router,
    private notificationService: NotificationService,
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  navUrlArr = [
    { title: 'Home', route: ['/project-coordinator/project-coordinator-home'] },
    { title: 'Projects', route: ['/project-coordinator/project-coordinator-projects-list'] },
  ];


  logout(): void {
    this.authService.logout();
  }

}
