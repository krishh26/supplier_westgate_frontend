import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-project-manger-header-two',
  templateUrl: './project-manger-header-two.component.html',
  styleUrls: ['./project-manger-header-two.component.scss']
})
export class ProjectMangerHeaderTwoComponent {
  loginUser: any;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    public router: Router,
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  navUrlArr = [
    { route: '/project-manager/project/all', title: 'All' },
    { route: '/project-manager/project/match', title: 'Matched' },
    { route: '/project-manager/project/close', title: 'Closed' },
    { route: '/project-manager/project/shortlisted', title: 'ShortListed' }
  ];


  logout(): void {
    this.authService.logout();
  }
}
