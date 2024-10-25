import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from 'src/app/services/project-manager/project-manager.service';

@Component({
  selector: 'app-project-manager-home',
  templateUrl: './project-manager-home.component.html',
  styleUrls: ['./project-manager-home.component.scss']
})
export class ProjectManagerHomeComponent implements OnInit{
  dashboardData!: any;

  constructor(
    private projectManagerService : ProjectManagerService
  ) {}

  ngOnInit(): void {
    this.getDashBoardDetails();
  }

  // get dashboard details
  getDashBoardDetails() {
    this.projectManagerService.getDashboardList().subscribe((response: any) => {
      if(response?.status) {
          this.dashboardData = response?.data;
      }
    });
  }
}
