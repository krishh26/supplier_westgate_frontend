import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierAdminComponent } from './supplier-admin.component';
import { TotalProjectsInCategoryComponent } from './total-projects-in-category/total-projects-in-category.component';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { ProjectsAppliedComponent } from './projects-applied/projects-applied.component';
import { ProjectsShortlistedComponent } from './projects-shortlisted/projects-shortlisted.component';
import { ProjectsAllComponent } from './projects-all/projects-all.component';
import { ProjectsMatchedComponent } from './projects-matched/projects-matched.component';
import { SupplierRoutingModule } from './supplier-admin.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ExpiredProjectComponent } from './expired-project/expired-project.component';
import { AppliedProjectsDetailsComponent } from './applied-projects-details/applied-projects-details.component';
import { SupplierHeaderComponent } from 'src/app/utility/shared/components/supplier-header/supplier-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { AddCaseStudyComponent } from './add-case-study/add-case-study.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupplierAdminProjectListingComponent } from './supplier-admin-project-listing/supplier-admin-project-listing.component';
import { SupplierDashboardHeaderComponent } from './supplier-dashboard-header/supplier-dashboard-header.component';
import { SupplierDashboardValueComponent } from './supplier-dashboard-value/supplier-dashboard-value.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { SupplierProjectSubmittedComponent } from './supplier-project-submitted/supplier-project-submitted.component';
import { SupplierProjectWorkInProgressComponent } from './supplier-project-work-in-progress/supplier-project-work-in-progress.component';
import { FooterComponent } from 'src/app/utility/shared/components/footer/footer.component';
import { ProjectDetailsForAppliedComponent } from './project-details-for-applied/project-details-for-applied.component';
import { QuestionAnswerDetailsComponent } from './question-answer-details/question-answer-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProjectListDashboardComponent } from './project-list-dashboard/project-list-dashboard.component';
import { ProjectDetailsDahboardComponent } from './project-details-dahboard/project-details-dahboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    SupplierAdminComponent,
    TotalProjectsInCategoryComponent,
    SupplierHomeComponent,
    ProjectsAppliedComponent,
    ProjectsShortlistedComponent,
    ProjectsAllComponent,
    ProjectsMatchedComponent,
    QuestionDetailsComponent,
    ProjectsDetailsComponent,
    ExpiredProjectComponent,
    AppliedProjectsDetailsComponent,
    SupplierHeaderComponent,
    AddUserComponent,
    ManageUserComponent,
    CaseStudiesComponent,
    AddCaseStudyComponent,
    UserProfileComponent,
    SupplierAdminProjectListingComponent,
    SupplierDashboardHeaderComponent,
    SupplierDashboardValueComponent,
    SupplierDashboardComponent,
    SupplierProjectSubmittedComponent,
    SupplierProjectWorkInProgressComponent,
    FooterComponent,
    ProjectDetailsForAppliedComponent,
    QuestionAnswerDetailsComponent,
    ProjectListDashboardComponent,
    ProjectDetailsDahboardComponent
  ],
  imports: [
    CommonModule,
    SupplierRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxSliderModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupplierAdminModule { }
