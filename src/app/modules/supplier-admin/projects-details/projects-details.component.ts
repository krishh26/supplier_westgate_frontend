import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-projects-details',
  templateUrl: './projects-details.component.html',
  styleUrls: ['./projects-details.component.scss']
})
export class ProjectsDetailsComponent {

  @ViewChild('downloadLink') private downloadLink!: ElementRef;

  showLoader: boolean = false;
  projectDetails: any = [];
  projectId: string = '';
  projectID: any;
  dateDifference: any;
  currentDate: Date = new Date();
  selectedDocument: any;
  loginUser: any;
  summaryquestionList: any;
  uploadedDocument: any;
  pageType: number = 2;
  source: string = '';
  selectViewImage: any;
  projectStrips: any = [];
  imageFields = [{ text: '', file: null }];

  constructor(
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer,
    private superadminService: SuperadminService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params['id'];
      this.pageType = Number(params['type']) || 2;
      this.source = params['source'] || '';
    });

    this.loginUser = this.localStorageService.getLogger();
  }

  ngOnInit(): void {
    this.getProjectDetails();
    // this.getSummaryQuestion()
    this.getProjectStrips();
  }



    // Handle file input change
    onFileChange(event: any, index: number) {
      const file = event.target.files[0];
      this.imageFields[index].file = file;
    }


  getProjectStrips() {
    this.projectService.getprojectStrips(this.projectId).subscribe(
      (response) => {
        if (response?.status == true) {

          this.projectStrips = response?.data?.data;

        } else {
          this.notificationService.showError(response?.message);

        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message || error?.message);
        this.showLoader = false;
      }
    );
  }

  formatMilliseconds(milliseconds: number): string {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} days`;
  }

  backPage() {
    this.router.navigate(['/supplier-admin/project-list'], { queryParams: { type: Number(this.pageType), source: this.source } });
  }

  openViewImage(image: any) {
    console.log('Image data full structure:', JSON.stringify(image, null, 2));
    this.selectViewImage = image;

    // Check all possible locations where the URL might be stored
    if (this.selectViewImage) {
      // First check direct URL
      if (!this.selectViewImage.url) {
        // Check if URL is in file.url
        if (this.selectViewImage.file?.url) {
          this.selectViewImage.url = this.selectViewImage.file.url;
          console.log('URL found in file.url:', this.selectViewImage.url);
        }
        // Check if URL is in key
        else if (this.selectViewImage.key) {
          this.selectViewImage.url = this.selectViewImage.key;
          console.log('URL set from key:', this.selectViewImage.url);
        }
      } else {
        console.log('URL found directly:', this.selectViewImage.url);
      }
    }
    console.log('Final selectViewImage:', this.selectViewImage);
  }

  getProjectDetails() {
    this.showLoader = true;
    this.projectService.getProjectDetailsById(this.projectId).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.projectDetails = response?.data;
        const dueDate = new Date(this.projectDetails?.dueDate);
        const currentDate = new Date();
        const dateDifference = Math.abs(dueDate.getTime() - currentDate.getTime());
        const formattedDateDifference: string = this.formatMilliseconds(dateDifference);
        this.dateDifference = formattedDateDifference;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }


  sortListProject(projectId: string) {
    const payload = {
      userId: this.loginUser.id,
      projectId: projectId
    }
    this.projectService.projectSortList(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
        this.getProjectDetails();
      } else {
        return this.notificationService.showError(response?.message);
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something went wrong !');
    })
  }

  getSummaryQuestion() {
    this.showLoader = true;
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

  questionDetails(details: any) {
    localStorage.setItem('ViewQuestion', JSON.stringify(details));
    this.router.navigate(['/supplier-admin/question-details'], { queryParams: { id: details?._id } });
  }


  openDocument(data: any) {
    this.uploadedDocument = data;
    console.log(this.selectedDocument);

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

  applyProject() {
    const payload = {
      userId: this.loginUser.id,
      projectId: this.projectId
    }
    this.projectService.projectApply(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess(response?.message);
      } else {
        return this.notificationService.showError(response?.message);
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something went wrong !');
    })
  }

  registerInterest() {
    const payload = {
      userId: this.loginUser.id,
      projectId: this.projectId
    }
    this.superadminService.registerInterest(payload).subscribe((response) => {
      if (response?.status) {
        this.notificationService.showSuccess('Interest registered successfully!');
        // Reload the page after successful API call
        window.location.reload();
      } else {
        return this.notificationService.showError(response?.message);
      }
    }, (error) => {
      return this.notificationService.showError(error?.error?.message || 'Something went wrong !');
    })
  }

  updateStripStatus(stripId: string, status: 'approved' | 'rejected') {
    const payload = {
      projectId: this.projectId,
      status: status
    };

    this.projectService.updateProjectDetailTitle(stripId, payload).subscribe(
      (response) => {
        if (response?.status) {
          this.notificationService.showSuccess(`Strip status ${status} successfully!`);
          // Reload the page to reflect changes
          window.location.reload();
        } else {
          this.notificationService.showError(response?.message || 'Failed to update strip status');
        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message || 'Something went wrong!');
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
