import { Component, OnInit } from '@angular/core';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
@Component({
  selector: 'app-role-wise-resources-list',
  templateUrl: './role-wise-resources-list.component.html',
  styleUrls: ['./role-wise-resources-list.component.scss']
})
export class RoleWiseResourcesListComponent {

  resourcesList: any = [];
  candidatesList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  loading: boolean = false;
  supplierID: string = '';
  supplierData: any = [];
  loginUser: any;
  rolesList: any[] = [];
  selectedRole: string = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private superService: SuperadminService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService
  ) {
    this.loginUser = this.localStorageService.getLogger();
   }

  ngOnInit() {
    const storedData = localStorage.getItem("supplierData");
    if (storedData) {
      this.supplierData = JSON.parse(storedData);
      this.supplierID = this.supplierData?._id;
    } else {
      console.log("No supplier data found in localStorage");
    }
    // Using a fixed list ID now: '67b60d775c16e4e640eee7dc'
    this.getCandidatesList();
    this.getRolesList();
  }

  ngAfterViewInit() {
    // Check if we need to refresh the list (set by edit component)
    const refreshNeeded = localStorage.getItem('refreshCandidatesList');
    if (refreshNeeded === 'true') {
      // Clear the flag
      localStorage.removeItem('refreshCandidatesList');
      // Refresh the list
      this.getCandidatesList();
    }
  }

  getCandidatesList() {
    this.loading = true;

    // Create an object for query parameters
    const queryParams: any = {
      page: this.page,
      pagesize: this.pagesize
    };

    // Add role filter if selected
    if (this.selectedRole) {
      queryParams.role = this.selectedRole;
    }

    this.superService.getCandidatesByListId(this.loginUser?._id, queryParams).subscribe(
      (response: any) => {
        this.loading = false;
        if (response && response.status) {
          this.candidatesList = response?.data?.data || [];
          this.totalRecords = response?.totalRecords || 0;
          // Store candidates list in localStorage
          localStorage.setItem('candidatesList', JSON.stringify(this.candidatesList));
        } else {
          this.notificationService.showError(response?.message || 'Failed to fetch candidate data');
        }
      },
      (error: any) => {
        this.loading = false;
        this.notificationService.showError(error?.error?.message || 'An error occurred while fetching candidate data');
      }
    );
  }

  getRolesList() {
    this.superService.getRolesList().subscribe({
      next: (response: any) => {

        if (response && response.status) {
          console.log('API Response:', response.data); // Log the API response
          this.rolesList = response?.data?.roles || [];
          console.log('Roles List:', this.rolesList); // Log the processed roles list
        } else {
          this.notificationService.showError(response?.message || 'Failed to fetch roles');
        }
      },
      error: (error: any) => {

        this.notificationService.showError(error?.error?.message || 'An error occurred while fetching roles');
      }
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.getCandidatesList();
  }

  viewCandidateDetails(candidate: any) {
    console.log('Viewing candidate details:', candidate);

    this.router.navigate(['/supplier-admin/resources-view-details'], {
      queryParams: {
        resourceName: candidate.fullName,
        resourceList: JSON.stringify([{
          name: candidate.fullName,
          supplierCount: 1,
          details: {
            jobTitle: candidate.jobTitle,
            experience: candidate.totalExperience,
            qualification: candidate.highestQualification,
            yearOfGraduation: candidate.yearOfGraduation,
            gender: candidate.gender,
            nationality: candidate.nationality,
            technicalSkills: candidate.technicalSkills,
            languages: candidate.languagesKnown,
            hourlyRate: candidate.hourlyRate,
            workingHours: candidate.workingHoursPerWeek,
            availableFrom: candidate.availableFrom,
            active: candidate.active,
            inactiveComment: candidate.inactiveComment,
            inactiveDate: candidate.inactiveDate
          }
        }])
      }
    });
  }

  deleteCandidates(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.superService.deleteCandidate(id).subscribe((response: any) => {
          if (response?.status == true) {
            this.notificationService.showSuccess('User successfully deleted');
            this.getCandidatesList();
          } else {
            this.notificationService.showError(response?.message);
          }
        }, (error) => {
          this.notificationService.showError(error?.error?.message);
        });
      }
    });
  }

  onRoleChange() {
    this.page = 1; // Reset to first page when filter changes
    this.getCandidatesList();
  }

}
