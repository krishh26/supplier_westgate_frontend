import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-project-manager-header',
  templateUrl: './project-manager-header.component.html',
  styleUrls: ['./project-manager-header.component.scss']
})
export class ProjectManagerHeaderComponent {
  loginUser: any;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {
    this.loginUser = this.localStorageService.getLogger();
  }

  logout(): void {
    this.authService.logout();
  }
}
