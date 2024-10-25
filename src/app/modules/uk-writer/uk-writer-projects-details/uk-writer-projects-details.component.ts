import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { UkWriterService } from 'src/app/services/uk-writer/uk-writer.service';

@Component({
  selector: 'app-uk-writer-projects-details',
  templateUrl: './uk-writer-projects-details.component.html',
  styleUrls: ['./uk-writer-projects-details.component.scss']
})
export class UkWriterProjectsDetailsComponent {
  projectID: string = '';
  supplierId: string = '';
  showLoader: boolean = false;
  projectDetails: any = [];
  supplierDetails: any = [];
  selectedDocument: any;
  summaryquestionList: any;
  uploadedDocument: any;
  documents: any[] = [];

  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private ukwriterService: UkWriterService,
    private router: Router,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {

    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.projectID = params['id']
      }
      if (params['supplierId']) {
        this.supplierId = params['supplierId']
      }
    });
    this.getProjectDetails()
    this.getSupplierDetails()

  }

  getProjectDetails() {
    this.projectService.getProjectDetailsById(this.projectID).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        this.processDocuments();
        this.summaryquestionList = response?.data?.summaryQuestion;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    },
      error => {
        this.notificationService.showError(error?.message);
        this.showLoader = false;
      })
  }

  processDocuments() {
    if (this.projectDetails) {
      this.documents = [
        { label: 'Sub-contracting', file: this.projectDetails.subContractingfile },
        { label: 'Economical partnership', file: this.projectDetails.economicalPartnershipQueryFile },
        { label: 'Economical partnership response', file: this.projectDetails.economicalPartnershipResponceFile },
        ...this.projectDetails.FeasibilityOtherDocuments.map((doc: any) => ({
          label: doc.name || 'Other Document',
          file: doc.file
        }))
      ];
    }
  }

  getSupplierDetails() {
    this.ukwriterService.getSupplierListById(this.projectID, this.supplierId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.supplierDetails = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    },
      error => {
        this.notificationService.showError(error?.message);
        this.showLoader = false;
      })
  }

  supplierListPage() {
    localStorage.setItem('UKprojectID', this.projectID)
    this.router.navigate(['/uk-writer/uk-writer-supplier-list'], { queryParams: { id: this.projectID } });
  }

  openDocument(data: any) {
    this.selectedDocument = data;
  }

  openUploadedDocument(document: any) {
    this.uploadedDocument = document;
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

  download(imageUrl: string, fileName: string): void {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); // You can customize the filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  questionDetails(details: any) {
    localStorage.setItem('ViewQuestion', JSON.stringify(details));
    this.router.navigate(['/uk-writer/uk-writer-question-details'], { queryParams: { id: details?._id } });
  }
}
