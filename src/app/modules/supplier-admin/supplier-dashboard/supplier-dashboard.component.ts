import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.scss']
})
export class SupplierDashboardComponent {

  supplierdashboardlist: any = [];
  showLoader: boolean = false;
  projectValue: any = [];
  projectCount: any = [];


  constructor(
    private supplierService: SupplierAdminService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.spinner.show();
    this.supplierService.getDashboardList().subscribe((response) => {
      this.spinner.hide();
      if (response?.status == true) {
        this.projectValue = response?.data?.projectValue;
        this.projectCount = response?.data?.projectCount;
        console.log(this.projectValue);

      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.spinner.hide();
    });
  }

  navigateToProjectList(status: string) {
    this.router.navigate(['/supplier-admin/dashboard-project-list'], { state: { status: status } });
  }


}
