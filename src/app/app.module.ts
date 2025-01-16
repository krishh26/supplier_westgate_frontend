import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './utility/shared/shared.module';
import { BOSUserModule } from './modules/bos-user/bos-user.module';
import { ResetPasswordComponent } from './utility/shared/components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './utility/shared/components/forgot-password/forgot-password.component';
import { LoginComponent } from './utility/shared/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { APIInterceptor } from './utility/interceptor/ApiInterceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FeasibilityModule } from './modules/feasibility-analyst/feasibility-analyst.module';
import { SupplierAdminModule } from './modules/supplier-admin/supplier-admin.module';
import { ProjectManagerModule } from './modules/Project-Manager/Project-Manager.module';
import { UkWriterModule } from './modules/uk-writer/uk-writer.module';
import { ProjectNotificationComponent } from './utility/shared/common/project-notification/project-notification.component';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { BidSubmissionModule } from './modules/bid-submission/bid-submission.module';
import { ProjectCoOrdinatorModule } from './modules/project-co-ordinator/project-co-ordinator.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MaintenceNoticePageComponent } from './utility/shared/components/maintence-notice-page/maintence-notice-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    MaintenceNoticePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BOSUserModule,
    FeasibilityModule,
    SupplierAdminModule,
    SuperAdminModule,
    UkWriterModule,
    BidSubmissionModule,
    ProjectCoOrdinatorModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgbModule,
    ProjectManagerModule,
    UkWriterModule,
    // NgSelectModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    NgxSpinnerModule,
    NgxSliderModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
