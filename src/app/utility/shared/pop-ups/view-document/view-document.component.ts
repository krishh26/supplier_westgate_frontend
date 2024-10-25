import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  documentData: any;

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    console.log('userDetails', this.documentData);
  }

  close(flag?: boolean): void {
    this.activeModal.close(flag);
  }
}
