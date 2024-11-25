import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ContactModal',
  templateUrl: './ContactModal.component.html',
  styleUrls: ['./ContactModal.component.css']
})
export class ContactModalComponent {
  @Input() projectName: string = ''; // Passed from the parent
  @Input() bosId: string = ''; // Passed from the parent
  message: string = '';
  preFilledMessage: string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    // Construct the email message
    this.preFilledMessage = `Hi Team,

I understand that the deadline for shortlisting this project has passed. However, I would still like to explore this opportunity further. Could you please confirm if there is still a feasible timeline available?

Project Name: ${this.projectName}
Bos ID: ${this.bosId}

Thank you!`;
  }

  submit() {
    this.activeModal.close(this.preFilledMessage); // Pass the entered message back to the parent component
  }

}
