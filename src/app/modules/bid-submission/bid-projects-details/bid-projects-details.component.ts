import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UkWriterService } from 'src/app/services/uk-writer/uk-writer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-bid-projects-details',
  templateUrl: './bid-projects-details.component.html',
  styleUrls: ['./bid-projects-details.component.scss']
})
export class BidProjectsDetailsComponent {

  @ViewChild('downloadLink') private downloadLink!: ElementRef;

  showLoader: boolean = false;
  projectDetails: any = [];
  projectId: string = '';
  projectID: any;
  dateDifference: any;
  currentDate: Date = new Date();
  selectedDocument: any;
  summaryQuestionList: any;
  supplierDetails: any = [];
  supplierId: string = '';
  documents: any[] = [];
  uploadedDocument: any;
  productForm!: FormGroup;

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ukwriterService: UkWriterService,
    private fb: FormBuilder,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
      if (params['supplierId']) {
        this.supplierId = params['supplierId']
      }
    });
  }

  ngOnInit(): void {
    this.getProjectDetails();
    this.getSummaryQuestion();
    // this.getSupplierDetails()
    this.productForm = this.fb.group({
      // other form controls
      waitingForResult: [false]  // Add this line
    });
  }

  viewDocument(document: any) {
    this.selectedDocument = document;
    console.log(this.selectedDocument?.url);

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

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} days`;
  }

  questionDetails(details: any) {
    localStorage.setItem('ViewQuestionForCoordinator', JSON.stringify(details));
     this.router.navigate(['bid-submission/bid-question-details'], { queryParams: { id: details?._id } });
  }

  getProjectDetails() {
    this.showLoader = true;
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      if (response?.status === true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        const dueDate = new Date(this.projectDetails?.dueDate);
        const currentDate = new Date();
        const dateDifference = Math.abs(dueDate.getTime() - currentDate.getTime());
        const formattedDateDifference: string = this.formatMilliseconds(dateDifference);
        this.dateDifference = formattedDateDifference;
        this.processDocuments();
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
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

  getSummaryQuestion() {
    this.showLoader = true;
    this.projectService.getSummaryQuestionList(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.summaryQuestionList = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
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

  openDocument(document: any) {
    this.uploadedDocument = document;
  }

  onSubmit(): void {
    if (this.projectId) {
      this.showLoader = true;
      this.projectService.editProject(this.projectId, this.productForm.value).subscribe(
        (response) => {
          if (response.status) {
            this.notificationService.showSuccess('', 'Project updated successfully.');
          } else {
            this.notificationService.showError(response?.message);
            this.showLoader = false;
          }
        },
        (error) => {
          this.notificationService.showError(error?.message);
          this.showLoader = false;
        }
      );
    }
  }
}
