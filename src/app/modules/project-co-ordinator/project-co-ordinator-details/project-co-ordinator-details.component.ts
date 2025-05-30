import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { ProjectCoordinatorService } from 'src/app/services/project-coordinator/project-coordinator.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-co-ordinator-details',
  templateUrl: './project-co-ordinator-details.component.html',
  styleUrls: ['./project-co-ordinator-details.component.scss']
})
export class ProjectCoOrdinatorDetailsComponent {
  showLoader: boolean = false;
  projectDetails: any = [];
  projectId: string = '';
  dateDifference: any;
  currentDate: Date = new Date();
  selectedDocument: any;
  loginUser: any;
  summaryQuestionList: any;
  documents: any[] = [];
  supportDocument!: FormGroup;
  projectStage!: FormGroup;
  uploadedDocument: any;

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private projectCoordinatorService: ProjectCoordinatorService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });

    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getProjectDetails();
    this.getSummaryQuestion();
    this.addDocument();
    this.addStage();
  }

  initializeForm() {
    this.supportDocument = this.fb.group({
      document: this.fb.array([])
    });

    this.projectStage = this.fb.group({
      stage: this.fb.array([])
    });
  }

  getProjectDetails() {
    this.showLoader = true;
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        this.processDocuments();
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
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
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  openDocument(data: any) {
    this.selectedDocument = data;
  }

  openUploadedDocument(document: any) {
    this.uploadedDocument = document;
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

  get document(): FormArray {
    return this.supportDocument.get("document") as FormArray
  }

  get stage(): FormArray {
    return this.projectStage.get("stage") as FormArray
  }

  newDocument(): FormGroup {
    return this.fb.group({
      key: '',
      url: '',
    })
  }

  newStage(): FormGroup {
    return this.fb.group({
      text: "",
      startDate: "",
      endDate: ""
    })
  }

  addDocument() {
    this.document.push(this.newDocument());
  }

  addStage() {
    this.stage.push(this.newStage());
  }

  removeDocument(i: number) {
    this.document.removeAt(i);
  }

  removeStage(i: number) {
    this.stage.removeAt(i);
  }

  updateProject() {
    const data = {
      supportingDocs: this.supportDocument.value?.document,
      stages: this.projectStage.value?.stage
    }
    this.projectCoordinatorService.updateProject(data, this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.getProjectDetails();
        this.notificationService.showSuccess('', 'Project Update Successfully.');
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
  addFiles(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      const data = new FormData();
      data.append('files', event.target.files[0])
      this.spinner.show();

      this.projectCoordinatorService.uploadDocument(data).subscribe((response) => {
        this.spinner.hide();
        if (response?.status) {
          this.document?.at(index)?.get('url')?.setValue(response?.data?.url);
          this.document?.at(index)?.get('key')?.setValue(response?.data?.key)
        }
      });
    }
  }

  questionDetails(details: any) {
    localStorage.setItem('ViewQuestionForCoordinator', JSON.stringify(details));
    this.router.navigate(['/project-coordinator/project-coordinator-question-details'], { queryParams: { id: details?._id } });
  }

  goToChat() {
    this.router.navigate(['/project-coordinator/project-coordinator-chats'], { queryParams: { id: this.projectId } });
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

}
