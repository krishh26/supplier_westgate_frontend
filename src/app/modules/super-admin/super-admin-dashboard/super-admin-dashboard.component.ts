import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import Chart from 'chart.js/auto';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.scss']
})
export class SuperAdminDashboardComponent {

  superdashboardlist: any = [];
  superstatictics: any = [];
  supplierUserList: any = [];
  showLoader: boolean = false;
  chart: any = [];
  selectedDuration: string = 'daily'; // Default value
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  categoryWise:any = []
  constructor(
    private superService: SuperadminService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getProjectDetails('daily');
    this.getSuperStatictics();
    this.getManageUserList();
  }

  onDurationChange(duration: 'yearly' | 'monthly' | 'weekly' | 'daily') {
    this.selectedDuration = duration;
    this.getProjectDetails(duration);
  }

  getProjectDetails(duration: 'yearly' | 'monthly' | 'weekly' | 'daily') {
    this.showLoader = true;
    this.superService.getDashboardList({ duration: this.selectedDuration }).subscribe(
      (response) => {
        if (response?.status == true) {
          this.showLoader = false;
          
          // Store the superdashboard list data
          this.superdashboardlist = response?.data;
  
          // Convert categoryWise object to an array of {name, totalProjects}
          this.categoryWise = Object.keys(response?.data?.categoryWise || {}).map(key => {
            return { name: key, totalProjects: response.data.categoryWise[key] };
          });
          
        } else {
          this.notificationService.showError(response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message);
        this.showLoader = false;
      }
    );
  }
  
  getSuperStatictics() {
    this.showLoader = true;
    this.superService.getsuperstatictics().subscribe(
      (response) => {
        if (response?.status == true) {
          this.showLoader = false;
          const responseData = response?.data;
          
          // Convert categoryWise object to an array of {name, totalProjects}
          this.categoryWise = Object.keys(responseData.categoryWise).map(key => {
            return { name: key, totalProjects: responseData.categoryWise[key] };
          });
  
          // Set up chart data if necessary (this part was unchanged)
          const day = this.superstatictics.map((project: any) => project?.day);
          const data = this.superstatictics.map((project: any) => project?.data);
          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: day,
              datasets: [
                {
                  label: '# Data',
                  data: data,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          this.notificationService.showError(response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message);
        this.showLoader = false;
      }
    );
  }
  

  getManageUserList() {
    this.showLoader = true;
    this.authservice.getUserList('SupplierAdmin').subscribe(
      (response) => {
        this.supplierUserList = [];
        this.totalRecords = response?.data?.meta_data?.items;
        if (response?.status == true) {
          this.showLoader = false;
          this.supplierUserList = response?.data;
          this.totalRecords = response?.totalCount;
        } else {
          this.notificationService.showError(response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message);
        this.showLoader = false;
      }
    );
  }

}
