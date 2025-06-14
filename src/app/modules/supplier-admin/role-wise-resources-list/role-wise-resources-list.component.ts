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
import { SupplierCommentModalComponent } from '../supplier-comment-modal/supplier-comment-modal.component';

@Component({
  selector: 'app-role-wise-resources-list',
  templateUrl: './role-wise-resources-list.component.html',
  styleUrls: ['./role-wise-resources-list.component.scss']
})
export class RoleWiseResourcesListComponent {
  activeTab: string = 'resources'; // Default active tab
  resourcesList: any = [];
  candidatesList: any = [];
  page: number = pagination.page;
  pagesize = 100; // Set to 100 items per page
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
          // Update totalRecords from meta_data for proper pagination
          this.totalRecords = response?.data?.meta_data?.items || 0;
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

  // Add paginate method similar to project-all page
  paginate(page: number) {
    this.page = page;
    this.getCandidatesList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewCandidateDetails(candidate: any) {
    const resourceData = [{
      name: candidate.fullName,
      supplierCount: 1,
      currentRoleData: candidate.currentRoleData || [],
      roleId: candidate.roleId || [],
      details: {
        jobTitle: candidate.jobTitle,
        experience: candidate.totalExperience,
        qualification: candidate.highestQualification,
        yearOfGraduation: candidate.yearOfGraduation,
        gender: candidate.gender,
        nationality: candidate.nationality,
        technicalSkills: candidate.technicalSkills,
        softSkills: candidate.softSkills || [],
        languages: candidate.languagesKnown,
        certifications: candidate.certifications || [],
        previousEmployers: candidate.previousEmployers || [],
        hourlyRate: candidate.hourlyRate,
        workingHours: candidate.workingHoursPerWeek,
        availableFrom: candidate.availableFrom,
        active: candidate.active,
        inactiveComment: candidate.inactiveComment,
        inactiveDate: candidate.inactiveDate,
        // Additional fields that might be displayed in details
        ukDayRate: candidate.ukDayRate || 0,
        ukHourlyRate: candidate.ukHourlyRate || 0,
        indianDayRate: candidate.indianDayRate || 0,
        ctc: candidate.ctc || 0,
        projectsExecuted: candidate.projectsExecuted || 0,
        statusDetails: candidate.statusDetails || 'N/A'
      },
      documents: candidate.documents || []
    }];

    this.router.navigate(['/supplier-admin/resources-view-details'], {
      queryParams: {
        resourceName: candidate.fullName,
        resourceList: JSON.stringify(resourceData)
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

  onToggleSwitch(item: any) {
    console.log('Toggle switch clicked, new state:', item.active);

    // If switching to inactive (false), open the comment modal
    if (item.active === false) {
      this.openCommentModal(item);
    } else {
      // If switching to active (true), update directly
      const payload = {
        data: {
          active: true,
          inactiveComment: '' // Clear any previous inactive comment
        }
      };

      console.log('Activating candidate with payload:', payload);

      this.superService.updateCandidate(item._id, payload).subscribe(
        (response: any) => {
          console.log('Activation response:', response);
          if (response?.status) {
            this.notificationService.showSuccess(response?.message || 'Candidate activated successfully');
            this.getCandidatesList();
          } else {
            this.notificationService.showError(response?.message || 'Failed to activate candidate');
            item.active = false; // Revert the toggle if there's an error
          }
        },
        (error: any) => {
          console.error('Error activating candidate:', error);
          this.notificationService.showError(error?.error?.message || 'Error activating candidate');
          // Revert the toggle if there's an error
          item.active = false;
        }
      );
    }
  }


  openCommentModal(item: any) {
    console.log('Opening comment modal for candidate:', item);

    // Create and initialize the modal component
    const modalRef = this.modalService.open(SupplierCommentModalComponent, { centered: true });
    modalRef.componentInstance.supplier = item;
    modalRef.componentInstance.itemType = 'candidate';
    modalRef.componentInstance.sourceComponent = 'resources-view';

    // Handle the result when modal is closed
    modalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
        // Refresh the data after successful comment submission
        if (result) {
          this.getCandidatesList();
        }
      },
      (reason) => {
        // If dismissed, revert the toggle switch state
        console.log('Modal dismissed:', reason);
        item.active = true; // Revert the toggle if modal was dismissed
      }
    );
  }

  // Filter method to get roles that are not in currentRoleData
  getICanBeRoles(candidate: any): any[] {
    if (!candidate?.roleId || !Array.isArray(candidate.roleId)) {
      return [];
    }

    // Get current role IDs
    const currentRoleIds = candidate?.currentRoleData?.map((role: any) => role._id) || [];

    // Filter roleId to exclude roles that are already in currentRoleData
    return candidate.roleId.filter((role: any) => !currentRoleIds.includes(role._id));
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
