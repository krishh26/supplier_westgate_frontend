import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth-service/auth.service';
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
  isMobileNavOpen = false;
  isDropdownOpen = false;


  constructor(
    private supplierService: SupplierAdminService,
    private notificationService: NotificationService,
    public router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getProjectDetails();
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileNav();
  }

    // Close Mobile Navigation when clicking a link
    closeMobileNav() {
      this.isMobileNavOpen = false;
      this.isDropdownOpen = false;
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
