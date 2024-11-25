import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProjectService } from 'src/app/services/project-service/project.service';

@Component({
  selector: 'app-ContactModal',
  templateUrl: './ContactModal.component.html',
  styleUrls: ['./ContactModal.component.css']
})
export class ContactModalComponent {
  @Input() projectName: string = ''; // Passed from the parent
  @Input() bosId: string = ''; // Passed from the parent
  @Input() supplierName: string = ''; // Passed from the parent
  message: string = '';
  preFilledMessage: string = '';
  showLoader: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private projectService: ProjectService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Construct the email message
    this.preFilledMessage = `Hi Team,

    I understand that the deadline for shortlisting this project has passed. However, I would still like to explore this opportunity further. Could you please confirm if there is still a feasible timeline available?

    Project Name: ${this.projectName}
    Bos ID: ${this.bosId}

    Thank you!`;
  }

  submit() {
    // Construct the payload for the API call
    const payload = {
      projectName: this.projectName,
      BOSID: this.bosId,
      supplierName: this.supplierName,
    };

    this.showLoader = true;

    // API call to send the project details
    this.projectService.contactMailSend(payload).subscribe(
      (response) => {
        if (response?.status === true) {
          this.showLoader = false;
          this.notificationService.showSuccess('', 'Mail sent successfully.');
          this.activeModal.close(this.preFilledMessage); // Close modal on success
        } else {
          this.notificationService.showError(response?.message || 'Failed to send mail.');
          this.showLoader = false;
        }
      },
      (error) => {
        this.notificationService.showError(error?.message || 'An error occurred.');
        this.showLoader = false;
      }
    );
  }
}
