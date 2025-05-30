import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';

@Component({
  selector: 'app-supplier-dashboard-value',
  templateUrl: './supplier-dashboard-value.component.html',
  styleUrls: ['./supplier-dashboard-value.component.scss']
})
export class SupplierDashboardValueComponent {

  supplierdashboardlist: any = [];
  showLoader: boolean = false;
  projectValue: any = [];
  projectCount: any = [];

  constructor(
    private supplierService: SupplierAdminService,
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
    this.supplierService.getDashboardList().subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectValue = response?.data?.projectValue;
        this.projectCount = response?.data?.projectCount;
        console.log(this.projectValue);
        
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

}
