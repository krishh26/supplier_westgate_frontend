import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SuperadminService } from 'src/app/services/super-admin/superadmin.service';
import { Patterns } from 'src/app/utility/shared/constant/validation-patterns.const';

@Component({
  selector: 'app-register-new-supplier',
  templateUrl: './register-new-supplier.component.html',
  styleUrls: ['./register-new-supplier.component.css']
})
export class RegisterNewSupplierComponent implements OnInit {
  companyForm!: FormGroup;
  showLoader: boolean = false;
  constructor(
    private fb: FormBuilder,
    private superadminService: SuperadminService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      website: ['', [Validators.required,]],
      yearOfEstablishment: ['', [Validators.required,]],
      registerNumber: ['', Validators.required],
      typeOfCompany: ['', Validators.required],
      "⁠industry_Sector": ['', Validators.required],
      companyAddress: ['', Validators.required],
      developerOrEngineerTeams: ['', [Validators.required]],
      dataPrivacyPolicies: ['', [Validators.required,]],
      securityCertifications: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.pattern(Patterns.email)]],
      number: ['', Validators.required],
      customerSupportContact: ['', [Validators.required, Validators.pattern(Patterns.mobile)]],
      VATOrGSTNumber: ['', Validators.required],
      companyDirectors_Owners: ['', Validators.required],
      complianceCertifications: ['', Validators.required],
      products_ServicesOffered: ['', Validators.required],
      technologyStack: ['', [Validators.required,]],
      licensingDetails: ['', Validators.required],
      IP_Patents: ['', Validators.required],
      password: ['', Validators.required],
      employeeCount: ['', Validators.required],
      cybersecurityPractices: ['', Validators.required]
    });
  }

  submitForm() {
    this.superadminService.supplierregister(this.companyForm.value).subscribe((response) => {
      if (response?.status == true) {
        this.showLoader = false;
        this.notificationService.showSuccess('', 'Supplier admin added successfully.');
        window.location.reload()
      } else {
        this.notificationService.showError(response?.message);
        this.showLoader = false;
      }
    }, (error) => {
      this.notificationService.showError(error?.error?.message);
      this.showLoader = false;
    });
  }

  NumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
