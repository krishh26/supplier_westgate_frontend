import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-superadmin-comment-modal',
  templateUrl: './superadmin-comment-modal.component.html',
  styleUrls: ['./superadmin-comment-modal.component.css']
})
export class SuperadminCommentModalComponent implements OnInit {

  @Input() supplier: any;
  userData!: any;

  userDataForm = {
    activeStatus: new FormControl("", [Validators.required]),
    active: new FormControl(true),
  };

  userForm = new FormGroup(this.userDataForm);

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    if (this.supplier) {
      this.userForm.patchValue({
        activeStatus: this.supplier.activeStatus || '',
        active: this.supplier.active || false,
      });
    }
  }

  close() {
    this.activeModal.dismiss();
  }

  onSubmit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.authService.updateUser(this.supplier._id, this.userForm.value).subscribe(
      (response: any) => {
        if (response?.status) {
          this.notificationService.showSuccess(response?.message);
          this.activeModal.close();
        }
      },
      (error) => {
        this.notificationService.showError(error?.error?.message || 'Error');
      }
    );
  }
}
