import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailscreenshotService } from 'src/app/services/mailscreenshot-service/mailscreenshot.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { pagination } from 'src/app/utility/shared/constant/pagination.constant';
import { Payload } from 'src/app/utility/shared/constant/payload.const';

@Component({
  selector: 'app-mail-screenshot-add-edit',
  templateUrl: './mail-screenshot-add-edit.component.html',
  styleUrls: ['./mail-screenshot-add-edit.component.scss']
})
export class MailScreenshotAddEditComponent {

  showLoader: boolean = false;
  mailList: any = [];
  searchText: any;
  page: number = pagination.page;
  pagesize = pagination.itemsPerPage;
  totalRecords: number = pagination.totalRecords;

  selectedDocument: any;
  imageToUpload: any;
  imageSrc: any;

  mailDocumentForm = {
    projectName: new FormControl("", [Validators.required,]),
    BOSId: new FormControl("", [Validators.required]),
    emailId: new FormControl("", [Validators.required, Validators.email]),
    link: new FormControl(""),
  };

  documentForm = new FormGroup(this.mailDocumentForm, []);

  constructor(
    private mailService: MailscreenshotService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMailSSList();
  }

  getMailSSList() {
    this.showLoader = true;
    Payload.mailSSList.keyword = this.searchText;
    Payload.mailSSList.page = String(this.page);
    Payload.mailSSList.limit = String(this.pagesize);
    this.mailService.getMailSSList(Payload.mailSSList).subscribe((response) => {
      this.mailList = [];
      this.totalRecords = response?.data?.meta_data?.items;
      if (response?.status == true) {
        this.showLoader = false;
        this.mailList = response?.data?.data;
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
      this.showLoader = false;
    });
  }

  // implement pagination
  paginate(page: number) {
    this.page = page;
    this.getMailSSList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // document open functionality
  openDocument(data: any) {
    this.selectedDocument = data;
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

  submitForm() {
    const data = new FormData();
    data.append('link', this.imageToUpload);
    data.append('projectName', this.documentForm?.controls?.projectName?.value || '');
    data.append('BOSId', this.documentForm.controls.BOSId?.value || '');
    data.append('emailId', this.documentForm.controls.emailId?.value || '');
    this.documentForm.markAllAsTouched();

    if (!this.imageToUpload) {
      return this.notificationService.showError('Please upload image');
    }

    if (!this.documentForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }

    this.mailService.addMailSS(data).subscribe((response) => {
      if (response?.status) {
        this.getMailSSList();
        this.documentForm.reset();
        this.imageToUpload = null;
        this.notificationService.showSuccess('Add Mail Ss successfully !');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
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
}
