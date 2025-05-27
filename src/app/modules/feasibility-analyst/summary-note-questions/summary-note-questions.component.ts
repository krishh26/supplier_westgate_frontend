import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeasibilityService } from 'src/app/services/feasibility-user/feasibility.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { SummaryService } from 'src/app/services/summary/summary.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-summary-note-questions',
  templateUrl: './summary-note-questions.component.html',
  styleUrls: ['./summary-note-questions.component.scss']
})
export class SummaryNoteQuestionsComponent {


  @ViewChild('downloadLink') private downloadLink!: ElementRef;

  showLoader: boolean = false;
  projectDetails: any = [];
  summaryquestionList: any = [];
  projectId: string = '';
  dateDifference: any;
  currentDate: Date = new Date();
  selectedDocument: any;
  isEditMode: boolean = false;
  currentSummaryId: number | null = null;
  showSuccess: boolean = false;
  eligibilityForm: FormGroup;
  viewClientDocumentForm: boolean = true;
  commentName: string = "";
  projectComment: any[] = [];
  isEditing = false;
  frontendMinimunEligibility : any = [];

  documentUploadType: any = {
    subContractDocument: 'SubContract',
    economicalPartnershipQuery: 'economicalPartnershipQuery',
    economicalPartnershipResponse: 'economicalPartnershipResponse',
    projectComment: 'projectComment',
    loginDetailDocument: 'loginDetailDocument',
    otherQueryDocument: 'otherQueryDocument',
    otherDocument: 'otherDocument',
    failStatusImage: "failStatusImage"
  }

  eligibility = {
    caseStudyRequired: new FormControl("", Validators.required),
    certifications: new FormControl("", Validators.required),
    policy: new FormControl("", Validators.required),
  }

  summary = {
    questionName: new FormControl("", Validators.required),
    question: new FormControl("", Validators.required),
    instructions: new FormControl("", Validators.required),
    weightage: new FormControl("", Validators.required),
    refrenceDocument: new FormControl("", Validators.required),
    projectId: new FormControl("", Validators.required),
    summaryQuestionFor: new FormControl("", Validators.required),
  }

  uploaddocform: FormGroup;

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private summaryService: SummaryService,
    private feasibilityService: FeasibilityService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
  ) {
    this.uploaddocform = new FormGroup(this.summary);
    this.eligibilityForm = new FormGroup(this.eligibility);
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id']
    });
  }

  ngOnInit(): void {
    this.getProjectDetails();
    this.getSummaryList();
  }

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    return `${days} days`;
  }

  getProjectDetails() {
    this.showLoader = true;
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        this.frontendMinimunEligibility = this.projectDetails?.eligibilityForm;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  hideShowForm() {
    this.viewClientDocumentForm = !this.viewClientDocumentForm
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

  getSummaryList() {
    this.projectService.getSummaryQuestionList(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.summaryquestionList = response?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  submiteligibilityForm() {
    if (this.frontendMinimunEligibility?.length == 0) {
      // this.frontendMinimunEligibility.push(this.eligibilityForm.value);
      // this.eligibilityForm.reset();
      return this.notificationService.showError('Please Add Eligibility In List.');
    }
    this.feasibilityService.updateProjectDetails({eligibilityForm : this.frontendMinimunEligibility}, this.projectId).subscribe({
      next: (res: any) => {
        this.showSuccess = true;
        this.notificationService.showSuccess(res?.message);
      },
      error: (err: any) => {
        return this.notificationService.showError('Something went wrong');
      }
    })
  }

  addNewFrontendMinimunEligibility() {
    if (!this.eligibilityForm.valid) {
      return this.notificationService.showError('Please Fill Form.');
    }
    this.frontendMinimunEligibility.push(this.eligibilityForm.value);
    this.eligibilityForm.reset();
  }


  submituploaddocform() {
    if (!this.uploaddocform.valid) {
      return this.notificationService.showError('Please Fill Form.');
    }
    this.feasibilityService.updateProjectDetails(this.uploaddocform.value, this.projectId).subscribe({
      next: (res: any) => {
      },
      error: (err: any) => {
        return this.notificationService.showError('Something went wrong');
      }
    })
  }


  resetForm() {
    this.uploaddocform.reset();
    this.uploaddocform.controls['projectId'].setValue(this.projectId)
    this.isEditMode = false;
    this.currentSummaryId = null;
  }

  editSummary(summary: any) {
    this.isEditMode = true;
    this.currentSummaryId = summary?._id;
    this.uploaddocform.patchValue({
      summaryQuestionFor: summary.summaryQuestionFor,
      questionName: summary.questionName,
      question: summary.question,
      refrenceDocument: summary.refrenceDocument,
      weightage: summary.weightage,
      instructions: summary.instructions
    });
  }

  deleteSummary(summaryId?: string) {
    this.summaryService.deleteSummary(summaryId).subscribe((response) => {
      if (response?.status == true) {
        this.getSummaryList();
        this.notificationService.showSuccess('question delete successfully !');
      } else {
        this.notificationService.showError(response?.message || 'Error');
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message || 'Something went wrong !');
    })
  }

  detailPage() {
    this.router.navigate(['/feasibility-user/minimum-eligibility-form'], { queryParams: { id: this.projectId } });
  }

  backPage() {
    this.router.navigate(['/feasibility-user/feasibility-project-detail'], { queryParams: { id: this.projectId } });
  }

  summaryDetail(type: string) {
    // Check if there are comments or documents added
    if (!this.projectDetails?.projectComment?.length) {
      return this.notificationService.showError('Please add comment and document');
    }

    // Call saveChanges after ensuring there is a comment and file
    this.saveChanges(type);

    // If type is 'next', navigate to the next route
    if (type === 'next') {
      this.router.navigate(['/feasibility-user/summary-note-questions'], { queryParams: { id: this.projectId } });
    }
  }

  uploadDocument(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append('files', file);
      this.spinner.show();

      this.feasibilityService.uploadDocument(data).subscribe((response) => {
        this.spinner.hide();
        if (response?.status) {
          if (!this.commentName) {
            return this.notificationService.showError('Enter a client document name');
          }

          // Add the uploaded file and comment to projectComment array
          let objToBePushed = {
            comment: this.commentName,
            file: response?.data
          };
          this.projectDetails.projectComment.push(objToBePushed);
          this.commentName = ""; // Clear the comment input
          this.notificationService.showSuccess(response?.message);
        } else {
          this.notificationService.showError(response?.message);
        }
      }, (error) => {
        this.spinner.hide();
        this.notificationService.showError(error?.error?.message || 'Error while uploading');
      });
    }
  }


  saveChanges(type?: string, contractEdit?: boolean) {
    let payload: any = {}
    if (!contractEdit) {
      payload = {
        projectComment: this.projectDetails?.projectComment || [],
      };
    }

    if (contractEdit) {
      payload = {
        projectComment: this.projectDetails?.projectComment || [],
      }
    }
    this.feasibilityService.updateProjectDetails(payload, this.projectDetails._id).subscribe(
      (response) => {
        if (response?.status === true) {
          this.notificationService.showSuccess('Project updated successfully');
          this.isEditing = false;
          this.getProjectDetails();
          if (type == 'save') {
            this.router.navigate(['/feasibility-user/summary-note-questions'], { queryParams: { id: this.projectId } });
          }
        } else {
          this.notificationService.showError(response?.message || 'Failed to update project');
        }
      },
      (error) => {
        this.notificationService.showError('Failed to update project');
      }
    );
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
