import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-resources-view-details',
  templateUrl: './resources-view-details.component.html',
  styleUrls: ['./resources-view-details.component.scss']
})
export class ResourcesViewDetailsComponent {
  resourceName: string = '';
  resourceList: any[] = [];
  viewDocs: any[] = [];
  showLoader: boolean = false;
  selectedResource: any = null;
  activeTab: string = 'overview'; // Default active tab

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private superService: SuperadminService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

    ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.resourceName = params['resourceName'];

      if (params['resourceList']) {
        try {
          this.resourceList = JSON.parse(params['resourceList']);

          // Process and enhance the resource data
          this.resourceList.forEach((resource: any) => {
            // Add default values for missing properties
            if (resource.details) {
              resource.details.active = resource.details.active !== undefined ? resource.details.active : true;

              // Format dates properly if they exist
              if (resource.details.inactiveDate) {
                // Convert string date to Date object if needed
                if (typeof resource.details.inactiveDate === 'string') {
                  resource.details.inactiveDate = new Date(resource.details.inactiveDate);
                }
              }
            }

            // Set viewDocs from resource documents
            if (resource.documents && resource.documents.length > 0) {
              this.viewDocs = resource.documents;
            }
          });
        } catch (error) {
          console.error('Error parsing resource list:', error);
          this.resourceList = [];
        }
      }
    });
  }



  viewDetails(resource: any): void {
    this.selectedResource = resource;
  }

  viewUploadedDocuments(resource: any) {
    console.log('Viewing documents for:', resource.name);

    this.viewDocs = resource.documents || [];

    if (!this.viewDocs || this.viewDocs.length === 0) {
      this.notificationService.showInfo(`No files available for ${resource.name}`);
      this.viewDocs = [];

      const modalElement = document.getElementById('viewAllDocuments');
      if (modalElement) {
        this.modalService.open(modalElement, { centered: true });
      }
      return;
    }

    const modalElement = document.getElementById('viewAllDocuments');
    if (modalElement) {
      this.modalService.open(modalElement, { centered: true });
    }
  }

  deleteDoc(docId: string) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.showLoader = true;
      this.spinner.show();

      this.superService.deleteDocumentResource(docId).subscribe(
        (response: any) => {
          if (response?.status === true) {
            this.showLoader = false;
            this.notificationService.showSuccess('Document successfully deleted');
            this.viewDocs = this.viewDocs.filter(doc => doc._id !== docId);
          } else {
            this.showLoader = false;
            this.notificationService.showError(response?.message);
          }
          this.spinner.hide();
        },
        (error) => {
          this.showLoader = false;
          this.notificationService.showError(error?.error?.message);
          this.spinner.hide();
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/supplier-admin/role-wise-resources-list']);
  }

  onImageError(event: any) {
    // Handle image loading error by hiding the image or showing a placeholder
    event.target.style.display = 'none';
    console.log('Image failed to load:', event.target.src);
  }

  getRolesArray(roles: string): string[] {
    if (!roles) return ['N/A'];
    // Split by comma and clean up whitespace
    return roles.split(',').map(role => role.trim()).filter(role => role.length > 0);
  }

  getSkillsValue(skills: any): string {
    // Return empty string if data is not available
    if (!skills) return '';

    // If it's an array, join with commas
    if (Array.isArray(skills)) {
      return skills.length > 0 ? skills.join(', ') : '';
    }

    // If it's a string, return as is
    return skills.toString();
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }
}
