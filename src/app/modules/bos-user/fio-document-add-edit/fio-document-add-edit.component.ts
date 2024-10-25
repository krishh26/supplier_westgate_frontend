import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FoiService } from 'src/app/services/foi-service/foi.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ViewDocumentComponent } from 'src/app/utility/shared/pop-ups/view-document/view-document.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-fio-document-add-edit',
  templateUrl: './fio-document-add-edit.component.html',
  styleUrls: ['./fio-document-add-edit.component.scss']
})
export class FioDocumentAddEditComponent implements OnInit {
  foiId: string = '';
  foiDocumentList: any[] = [];
  selectedDocument: any;
  imageToUpload: any;
  imageSrc: any;

  foiDocumentForm = {
    name: new FormControl("", [Validators.required,]),
    projectId: new FormControl("", [Validators.required]),
    link: new FormControl(""),
  };

  documentForm = new FormGroup(this.foiDocumentForm, []);

  constructor(
    private foiService: FoiService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer
  ) {
    this.route.queryParams.subscribe((params) => {
      this.foiId = params['id'];
      this.documentForm.controls.projectId.setValue(this.foiId);
    });
  }

  ngOnInit(): void {
    this.getFoiDocumentList();
    console.log('foiId', this.foiId)
  }

  getFoiDocumentList() {
    this.foiDocumentList = [];
    this.foiService.getFOIList().subscribe((response) => {
      if (response?.status) {
        response?.data?.data?.map((element: any) => {
          if (element?.projectId == this.foiId) {
            this.foiDocumentList.push(element);
          }
        });
      }
    })
  }

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
    data.append('name', this.documentForm?.controls?.name?.value || '');
    data.append('projectId', this.documentForm.controls.projectId?.value || '');
    this.documentForm.markAllAsTouched();
    if (!this.imageToUpload) {
      return this.notificationService.showError('Please upload image');
    }
    if (!this.documentForm.valid) {
      return this.notificationService.showError('Please fill the form all details!');
    }
    this.foiService.addFOI(data).subscribe((response) => {
      if (response?.status) {
        this.getFoiDocumentList();
        this.documentForm.reset();
        this.imageToUpload = null;
        window.location.reload();
        this.notificationService.showSuccess('Add FOI Document successfully!');
      } else {
        this.notificationService.showError(response?.message);
      }
    }, (error) => {
      this.notificationService.showError(error?.message);
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

}
