import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { SupplierCommentModalComponent } from '../supplier-comment-modal/supplier-comment-modal.component';

@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.scss']
})
export class ResourcesViewComponent {

  searchText: any;
  myControl = new FormControl();
  resourcesList: any = [];
  candidatesList: any = [];
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  loading: boolean = false;
  roleId: string = '';
  activeFilter: boolean = false;
  inactiveFilter: boolean = false;
  metaData: any = {};

  constructor(
    private supplierService: SupplierAdminService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private superService: SuperadminService,
    public modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    // Get roleId from localStorage if available
    const savedRoleId = localStorage.getItem('selectedRoleId');

    this.route.queryParams.subscribe(params => {
      if (params['roleId']) {
        // If roleId is in URL, save it and use it
        this.roleId = params['roleId'];
        localStorage.setItem('selectedRoleId', this.roleId);
        this.getRoleWiseCandidates();
      } else if (savedRoleId) {
        // If no roleId in URL but exists in localStorage, restore it
        this.roleId = savedRoleId;
        // Update URL with the saved roleId
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { roleId: this.roleId },
          queryParamsHandling: 'merge'
        });
        this.getRoleWiseCandidates();
      } else {
        // If no roleId anywhere, redirect to roles list
        this.router.navigate(['/super-admin/role-wise-resources-list']);
      }
    });

    this.myControl.valueChanges.subscribe((res: any) => {
      this.searchText = res?.toLowerCase();
      this.getRoleWiseCandidates();
    });
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
            this.getRoleWiseCandidates();
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
          this.getRoleWiseCandidates();
        }
      },
      (reason) => {
        // If dismissed, revert the toggle switch state
        console.log('Modal dismissed:', reason);
        item.active = true; // Revert the toggle if modal was dismissed
      }
    );
  }

  getRoleWiseCandidates() {
    this.loading = true;
    this.spinner.show();

    // Create query string with parameters
    let queryString = `?page=${this.page}&limit=${this.pagesize}`;
    if (this.searchText) queryString += `&search=${this.searchText}`;
    if (this.activeFilter && !this.inactiveFilter) queryString += '&active=true';
    if (!this.activeFilter && this.inactiveFilter) queryString += '&active=false';

    this.superService.getCandidatesByRole(this.roleId + queryString).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.candidatesList = res.data;
          this.metaData = res.meta_data;
          this.totalRecords = res.meta_data.totalCandidates;
        }
        this.loading = false;
        this.spinner.hide();
      },
      error: (error) => {
        console.error('Error fetching candidates:', error);
        this.notificationService.showError(error?.message || 'Error fetching candidates');
        this.loading = false;
        this.spinner.hide();
      }
    });
  }

  pageChanged(event: any) {
    this.page = event;
    this.updateUrlWithParams();
    this.getRoleWiseCandidates();
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

  searchtext() {
    this.page = 1;
    this.updateUrlWithParams();
    this.getRoleWiseCandidates();
  }

  // Add new method to update URL params
  private updateUrlWithParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        roleId: this.roleId,
        page: this.page,
        search: this.searchText || null
      },
      queryParamsHandling: 'merge'
    });
  }

  onFilterChange() {
    this.page = 1;
    this.updateUrlWithParams();
    this.getRoleWiseCandidates();
  }

  // Update ngOnDestroy to clean up if needed
  ngOnDestroy() {
    // Optionally clear the stored roleId when leaving the component
    // Uncomment if you want to clear it when leaving the page
    // localStorage.removeItem('selectedRoleId');
  }
}
