import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-uk-writer-header',
  templateUrl: './uk-writer-header.component.html',
  styleUrls: ['./uk-writer-header.component.scss']
})
export class UkWriterHeaderComponent  {

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
    { title: 'Home', route: ['/uk-writer/uk-writer-home'] },
    { title: 'Live Projects', route: ['/uk-writer/uk-writer-projects-all'] },
  ];


  logout(): void {
    this.authService.logout();
  }

}
