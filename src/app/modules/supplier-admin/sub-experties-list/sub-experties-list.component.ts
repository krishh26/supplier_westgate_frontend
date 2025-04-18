import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sub-experties-list',
  templateUrl: './sub-experties-list.component.html',
  styleUrls: ['./sub-experties-list.component.scss']
})
export class SubExpertiesListComponent {

  expertiseName: string = '';
  supplierId: string = '';
  subExpertiseList: any[] = [];
  totalRecords: number = pagination.totalRecords;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  selectedFiles: File[] = [];
  supplierID: string = '';
  viewDocs: any;
  showLoader: boolean = false;
  files: any = []
  newSubExpertise: string = '';
  subExpertiseTags: string[] = [];
  showAddButton: boolean = true;
  isFromExpertiseView: boolean = false;
  subExpertiseDropdownList: any[] = [];
  collapsedItems: { [key: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierAdminService,
    private notificationService: NotificationService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private superService: SuperadminService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // Check if coming from expertise-view
    if (this.router.getCurrentNavigation()?.extras?.state) {
      const navigationState = this.router.getCurrentNavigation()?.extras?.state;
      if (navigationState && navigationState['from'] === 'expertise-view') {
        this.showAddButton = false;
        this.isFromExpertiseView = true;
      }
    }

    // Check if URL contains expertise-view
    const previousUrl = this.router.url;
    if (previousUrl.includes('/super-admin/expertise-view')) {
      this.showAddButton = false;
      this.isFromExpertiseView = true;
    }

    this.route.queryParams.subscribe(params => {
      // Get expertise name and supplierId from query params
      this.expertiseName = params['expertiseName'];
      this.supplierId = params['supplierId'];

      // Also set supplierID to use in other methods
      if (this.supplierId) {
        this.supplierID = this.supplierId;
      }

      // Check for source parameter
      if (params['source'] === 'expertise-view') {
        this.showAddButton = false;
        this.isFromExpertiseView = true;
      }

      console.log('Loading sub-expertise list for:', {
        expertiseName: this.expertiseName,
        supplierId: this.supplierId,
        isFromExpertiseView: this.isFromExpertiseView
      });

      // Fetch sub-expertise data
      this.getSubExpertise();
    });
  }

  onFilesSelected(event: any, expertise: string) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    this.selectedFiles = Array.from(event.target.files);

    const invalidFiles = this.selectedFiles.filter(file => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      alert('Only PDF or Word files (.pdf, .doc, .docx) are allowed.');
      this.selectedFiles = [];
      return;
    }

    if (this.selectedFiles.length > 0) {
      this.uploadFiles(expertise);
    }
  }

  uploadFiles(expertise: string) {
    if (!this.selectedFiles.length) {
      this.notificationService.showError('Please select files to upload.');
      return;
    }

    // Check if we have a supplier ID
    if (!this.supplierId && !this.supplierID) {
      this.notificationService.showError('Supplier ID is missing, cannot upload files.');
      return;
    }

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });
    formData.append('expertise', this.expertiseName);
    formData.append('subExpertise', expertise);
    formData.append('supplierId', this.supplierId || this.supplierID);
    this.spinner.show();
    this.superService.uploadByTag(formData).subscribe(
      (response: any) => {
        if (response?.status) {
          this.spinner.hide();
          this.notificationService.showSuccess('Files uploaded successfully!');
          // Refresh the file list after upload
          this.getSubExpertise();
        } else {
          this.spinner.hide();
          this.notificationService.showError(response?.message);
        }
      },
      (error) => {
        this.notificationService.showError(error?.message);
      }
    );
  }

  deleteDoc(fileId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this document?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        this.showLoader = true;

        this.superService.deleteDocumentExpertise(fileId).subscribe(
          (response: any) => {
            if (response?.status === true) {
              this.showLoader = false;
              this.notificationService.showSuccess('Document successfully deleted');
              window.location.reload(); // Optional: Refresh data
            } else {
              this.showLoader = false;
              this.notificationService.showError(response?.message);
            }
          },
          (error) => {
            this.showLoader = false;
            this.notificationService.showError(error?.message);
          }
        );
      }
    });
  }

  viewUploadedDocuments(subExpertise: string) {
    console.log('Viewing documents for:', subExpertise);

    // Filter files by subExpertise
    this.viewDocs = this.files?.filter((file: any) => file?.subExpertise === subExpertise);

    if (!this.viewDocs || this.viewDocs.length === 0) {
      this.notificationService.showInfo(`No files available for ${subExpertise}`);
      this.viewDocs = [];

      // Still open the modal but it will show "No Files Available"
      const modalElement = document.getElementById('viewAllDocuments');
      if (modalElement) {
        this.modalService.open(modalElement, { centered: true });
      }
      return;
    }

    // Open the modal
    const modalElement = document.getElementById('viewAllDocuments');
    if (modalElement) {
      this.modalService.open(modalElement, { centered: true });
    }
  }

  getSubExpertise() {
    if (!this.expertiseName) {
      console.error('Expertise name is missing');
      return;
    }

    if (this.isFromExpertiseView) {
      // For expertise-view path, we need to get all expertises and then filter
      this.superService.getExpertiseList().subscribe(
        (response) => {
          if (response?.status) {
            // Find all expertise entries with the matching name
            const matchingExpertises = response?.data?.filter((item: any) => item.name === this.expertiseName);

            if (matchingExpertises && matchingExpertises.length > 0) {
              // Collect all unique subExpertise values
              const allSubExpertises = new Set<string>();

              matchingExpertises.forEach((expertise: any) => {
                if (expertise.subExpertise && Array.isArray(expertise.subExpertise)) {
                  expertise.subExpertise.forEach((sub: string) => allSubExpertises.add(sub));
                }
              });

              this.subExpertiseList = Array.from(allSubExpertises);
              this.totalRecords = this.subExpertiseList.length;
            } else {
              console.error(`Expertise with name "${this.expertiseName}" not found`);
              this.subExpertiseList = [];
            }
          } else {
            console.error('Error fetching expertise data:', response?.message);
            this.subExpertiseList = [];
          }
        },
        (error) => {
          console.error('Error fetching sub-expertise:', error);
          this.subExpertiseList = [];
        }
      );
    } else {
      // For other paths, we filter by supplier ID
      if (!this.supplierId) {
        console.error('Supplier ID is missing');
        return;
      }

      this.supplierService.getSupplierDetails(this.supplierId).subscribe(
        (response) => {
          if (response?.status) {
            // Find all expertise entries with the matching name for this supplier
            const matchingExpertises = response?.data?.expertise?.filter((item: any) =>
              item.name === this.expertiseName
            );

            if (matchingExpertises && matchingExpertises.length > 0) {
              // Collect all unique subExpertise values
              const allSubExpertises = new Set<string>();

              matchingExpertises.forEach((expertise: any) => {
                if (expertise.subExpertise && Array.isArray(expertise.subExpertise)) {
                  expertise.subExpertise.forEach((sub: string) => allSubExpertises.add(sub));
                }
              });

              this.subExpertiseList = Array.from(allSubExpertises);
              this.totalRecords = this.subExpertiseList.length;
              this.files = response?.files || [];
            } else {
              console.error(`Expertise with name "${this.expertiseName}" not found for supplier ID ${this.supplierId}`);
              this.subExpertiseList = [];
            }
          } else {
            console.error('Error fetching supplier data:', response?.message);
            this.subExpertiseList = [];
          }
        },
        (error) => {
          console.error('Error fetching sub-expertise:', error);
          this.subExpertiseList = [];
        }
      );
    }
  }

  addTag() {
    if (this.newSubExpertise?.trim()) {
      // Check if the tag already exists
      if (!this.subExpertiseTags.includes(this.newSubExpertise.trim())) {
        this.subExpertiseTags.push(this.newSubExpertise.trim());
      } else {
        this.notificationService.showInfo('This tag already exists');
      }
      this.newSubExpertise = ''; // Clear the input
    }
  }

  removeTag(index: number) {
    this.subExpertiseTags.splice(index, 1);
  }

  saveSubExpertise() {
    if (this.subExpertiseTags.length === 0) {
      this.notificationService.showError('Please add at least one sub expertise tag');
      return;
    }

    // Check if we have a supplier ID
    if (!this.supplierId && !this.supplierID) {
      this.notificationService.showError('Supplier ID is missing, cannot save sub-expertise tags.');
      return;
    }

    // Prepare data with only the expertise being updated
    const expertiseData = {
      expertise: this.expertiseName,
      subExpertise: this.subExpertiseTags,
      supplierId: this.supplierId || this.supplierID
    };

    this.superService.addExpertiseandSubExpertise(expertiseData).subscribe(
      (response: any) => {
        if (response?.status) {
          this.notificationService.showSuccess('Sub expertise tags added successfully!');
          this.subExpertiseTags = []; // Reset the tags array
          this.getSubExpertise(); // Refresh the list

          // Close the modal
          const modalElement = document.getElementById('addSubExpertiseModal');
          if (modalElement) {
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.hide();
          }
        } else {
          this.notificationService.showError(response?.message || 'Failed to add sub expertise tags');
        }
      },
      (error: any) => {
        this.notificationService.showError(error?.message || 'Failed to add sub expertise tags');
      }
    );
  }

  // Updated function to store search results
  getSubExpertiseList(searchText?: string) {
    this.spinner.show();
    this.superService.getSubExpertiseDropdownList(searchText).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response?.status) {
          this.subExpertiseDropdownList = response?.data || [];
          console.log('Sub-expertise dropdown list loaded:', this.subExpertiseDropdownList);
        } else {
          console.error('Error fetching sub-expertise dropdown list:', response?.message);
          this.subExpertiseDropdownList = [];
        }
      },
      (error: any) => {
        this.spinner.hide();
        console.error('Error fetching sub-expertise dropdown list:', error);
        this.subExpertiseDropdownList = [];
      }
    );
  }

  isCollapsed(index: number): boolean {
    return this.collapsedItems[index] === true;
  }

  toggleCollapse(index: number): void {
    this.collapsedItems[index] = !this.collapsedItems[index];
  }

  deleteSubExpertise(subExpertiseName: string, event: MouseEvent): void {
    // Prevent accordion from toggling when clicking the delete button
    event.stopPropagation();
    event.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the sub-expertise "${subExpertiseName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result: any) => {
      if (result?.value) {
        // Show spinner
        this.spinner.show();

        // First, we need to get the expertise ID from the expertiseName
        this.supplierService.getSupplierDetails(this.supplierId).subscribe(
          (response) => {
            if (response?.status) {
              // Find the expertise with matching name
              const expertise = response.data?.expertise?.find((item: any) =>
                item.name === this.expertiseName
              );

              if (!expertise || !expertise.itemId) {
                this.spinner.hide();
                this.notificationService.showError('Could not find expertise ID. Delete operation failed.');
                return;
              }

              // Now that we have the expertise ID, we can call the delete API
              this.superService.deleteSubExpertise(
                expertise.itemId,
                subExpertiseName,
                this.supplierId
              ).subscribe(
                (deleteResponse: any) => {
                  this.spinner.hide();
                  if (deleteResponse?.status) {
                    this.notificationService.showSuccess('Sub-expertise deleted successfully');
                    // Refresh the sub-expertise list
                    this.getSubExpertise();
                  } else {
                    this.notificationService.showError(deleteResponse?.message || 'Failed to delete sub-expertise');
                  }
                },
                (error: any) => {
                  this.spinner.hide();
                  this.notificationService.showError(error?.message || 'An error occurred while deleting the sub-expertise');
                }
              );
            } else {
              this.spinner.hide();
              this.notificationService.showError(response?.message || 'Failed to retrieve expertise data');
            }
          },
          (error: any) => {
            this.spinner.hide();
            this.notificationService.showError(error?.message || 'Failed to retrieve expertise data');
          }
        );
      }
    });
  }

  openFileSelector(index: number): void {
    const fileInput = document.getElementById('fileInput' + index) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }


}
