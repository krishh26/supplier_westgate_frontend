import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-bid-submission-header',
  templateUrl: './bid-submission-header.component.html',
  styleUrls: ['./bid-submission-header.component.scss']
})
export class BidSubmissionHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
  }
}
