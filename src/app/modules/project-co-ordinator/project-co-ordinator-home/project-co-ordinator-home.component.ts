import { Component, OnInit } from '@angular/core';
import { ProjectCoordinatorService } from 'src/app/services/project-coordinator/project-coordinator.service';

@Component({
  selector: 'app-project-co-ordinator-home',
  templateUrl: './project-co-ordinator-home.component.html',
  styleUrls: ['./project-co-ordinator-home.component.scss']
})
export class ProjectCoOrdinatorHomeComponent implements OnInit {
  dashboardData!: any;

  constructor(
    private projectCoordinatorService: ProjectCoordinatorService
  ) { }

  ngOnInit(): void {
    this.getDashBoardDetails();
  }

  // get dashboard details
  getDashBoardDetails() {
    this.projectCoordinatorService.getDashboardList().subscribe((response: any) => {
      if (response?.status) {
        this.dashboardData = response?.data;
      }
    });
  }
}
