import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { SupplierAdminService } from 'src/app/services/supplier-admin/supplier-admin.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import Swal from 'sweetalert2';
declare var bootstrap: any;
@Component({
  selector: 'app-case-studies',
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss']
})
export class CaseStudiesComponent {

  showLoader: boolean = false;
  caseStudyList: any = [];
  file: any;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;
  imageToUpload: any;
  imageSrc: any;
  selectedDocument: any;
  selectedCasestudy: any;
  categoryList: any = [];
  selectedCaseStudy: any = null;
  currentUserId: string = '';

  constructor(
    private supplierService: SupplierAdminService,
    private notificationService: NotificationService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private superService: SuperadminService,private spinner: NgxSpinnerService
  ) { }

  casestudyForm = {
    name: new FormControl(""),
    category: new FormControl(""),
    subCategory: new FormControl(""),
    file: new FormControl(""),
  };

  caseForm = new FormGroup(this.casestudyForm, []);

  ngOnInit(): void {
    this.getCaseStudiesList();
    this.getCategoryList();
    // this.selectedCasestudy = 'https://f005.backblazeb2.com/file/west-get-it-hub-1/files/1732522549232_Case Study Template.docx';
    this.selectedCasestudy = '';
    console.log(this.selectedCasestudy);
  }

  getCategoryList() {
    this.showLoader = true;
    this.superService.getCategoryList().subscribe(
      (response) => {
        if (response?.status && response?.message === "category fetched successfully") {
          this.categoryList = response.data;
          this.showLoader = false;
        } else {
          console.error('Failed to fetch categories:', response?.message);
          this.showLoader = false;
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.showLoader = false;
      }
    );
  }

  viewCaseStudyDetails(caseStudy: any) {
    this.selectedCaseStudy = caseStudy;
    // Open the modal using Bootstrap's modal
    const modalElement = document.getElementById('caseStudyDetailsModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  getCaseStudiesList() {
    this.showLoader = true;
    this.supplierService.getCaseStudyList().subscribe((response) => {
      this.caseStudyList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.caseStudyList = response?.data?.data;
        console.log(this.caseStudyList);

        // Initialize showFullDescription property for each case study
        this.caseStudyList.forEach((caseStudy: any) => {
          caseStudy.showFullDescription = false;
        });

        this.totalRecords = response?.totalCount;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  addCaseStudy() {
    const data = new FormData();
    data.append('name', this.caseForm.controls.name.value || '');
    data.append('category', this.caseForm.controls.category.value || '');
    data.append('subCategory', this.caseForm.controls.subCategory.value || '');
    data.append('file', this.imageToUpload || '');
    this.showLoader = true;
    this.supplierService.addCaseStudy(data).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.notificationService.showSuccess('Case-Study add successfully.');
        window.location.reload();
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  // Handle the file change event
  addFiles(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageToUpload = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result
      };
      reader.readAsDataURL(file);
    }
  }

  onFileChange(event: any, caseStudyId: number): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('files', file);
      this.spinner.show();
      console.log(caseStudyId);
      this.supplierService.uploadDocument(formData).subscribe((response) => {
        this.spinner.hide();
        if (response.status === true) {
          this.notificationService.showSuccess('Document uploaded successfully.');
          this.updateCaseStudy(response.data, caseStudyId);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.notificationService.showError(response.message);
        }
        this.showLoader = false;
      }, (error) => {
        this.spinner.hide();
        this.notificationService.showError(error.message);
        this.showLoader = false;
      });
    }
  }

  updateCaseStudy(data: any, id: number) {
    this.showLoader = true;
    this.supplierService.updateCaseStudy({ 'link': data }, id).subscribe((response) => {
      if (response.status === true) {
        this.notificationService.showSuccess('Case studies Update successfully.');
      } else {
        this.notificationService.showError(response.message);
      }
      this.showLoader = false;
    }, (error) => {
      this.notificationService.showError(error.message);
      this.showLoader = false;
    });
  }

  deleteCaseStudy(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result:any) => {
      if (result?.value) {
        this.showLoader = true;
        this.supplierService.deleteCaseStudies(id).subscribe((response: any) => {
          if (response?.status == true) {
            this.showLoader = false;
            this.notificationService.showSuccess('Case Study successfully deleted');
            this.getCaseStudiesList();
          } else {
            this.showLoader = false;
            this.notificationService.showError(response?.message);
          }
        }, (error) => {
          this.showLoader = false;
          this.notificationService.showError(error?.error?.message);
        });
      }
    });
  }


  paginate(page: number) {
    this.page = page;
    this.getCaseStudiesList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  openDocument(data: any) {
    this.selectedDocument = data;
  }

  download(imageUrl: string, fileName: string): void {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }


  triggerDownload() {
    var file: string = './../../../../assets/img/case-study.png';
    const downloadLink = document.createElement('a');

    if (typeof file === 'string') {
      downloadLink.href = file;
    } else {
      downloadLink.href = URL.createObjectURL(file);
    }

    downloadLink.download = 'template.png';
    downloadLink.click();

    // For some browsers, remove the object URL after download:
    if (typeof file === 'object') {
      URL.revokeObjectURL(downloadLink.href);
    }
  }


  isPdf(url: string): boolean {
    return url?.endsWith('.pdf') || false;
  }

  isWordOrExcel(url: string): boolean {
    return url?.endsWith('.doc') || url?.endsWith('.docx') || url?.endsWith('.xls') || url?.endsWith('.xlsx') || false;
  }

  isImage(url: string): boolean {
    return url?.endsWith('.jpg') || url?.endsWith('.jpeg') || url?.endsWith('.png') || false;
  }

  getDocumentViewerUrl(url: string): SafeResourceUrl {
    if (this.isWordOrExcel(url)) {
      const officeUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(officeUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

    // Helper method to check if description exceeds a certain length
    isDescriptionLong(description: string, length: number = 100): boolean {
      return description ? description.length > length : false;
    }

    // Helper method to check if drop reason exceeds a certain length
    isDropReasonLong(dropUsers: any[], length: number = 50): boolean {
      const reason = this.getDropReasonForCurrentUser(dropUsers);
      return reason ? reason.length > length : false;
    }

    getDropReasonForCurrentUser(dropUsers: any[]): string {
      if (!dropUsers || !dropUsers.length || !this.currentUserId) {
        return '';
      }

      const currentUserDropInfo = dropUsers.find(drop => drop.userId === this.currentUserId);
      if (currentUserDropInfo && currentUserDropInfo.reason && currentUserDropInfo.reason.length > 0) {
        return currentUserDropInfo.reason[0].comment;
      }

      return '';
    }

  closeMobileNav() {
    // Close mobile navigation menu
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
      navbarCollapse.classList.remove('show');
    }
  }

  logout() {
    // Clear local storage
    localStorage.clear();
    // Navigate to login page
    this.router.navigate(['/login']);
  }

}
