import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectManagerComponent } from './Project-Manager.component';
import { ProjectManagerRoutingModule } from './project-manager.routing.module';
import { ProjectManagerHeaderComponent } from 'src/app/utility/shared/components/project-manager-header/project-manager-header.component';
import { ProjectMangerHeaderTwoComponent } from 'src/app/utility/shared/components/project-manger-header-two/project-manger-header-two.component';
import { ProjectManagerHomeComponent } from './project-manager-home/project-manager-home.component';
import { ProjectManagerCloseProjectListComponent } from './project-manager-close-project-list/project-manager-close-project-list.component';
import { ProjectManagerAllProjectListComponent } from './project-manager-all-project-list/project-manager-all-project-list.component';
import { ProjectManagerMatchProjectListComponent } from './project-manager-match-project-list/project-manager-match-project-list.component';
import { AllProjectDetailsComponent } from './all-project-details/all-project-details.component';
import { MatchProjectDetailsComponent } from './match-project-details/match-project-details.component';
import { ProjectCloseDetailsComponent } from './project-close-details/project-close-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectManagerSummaryDetailComponent } from './project-manager-summary-detail/project-manager-summary-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectMangerProfileComponent } from './project-manger-profile/project-manger-profile.component';
import { PmShortlistedProjectsComponent } from 'src/app/modules/Project-Manager/pm-shortlisted-projects/pm-shortlisted-projects.component';
import { PmCaseStudiesComponent } from 'src/app/modules/Project-Manager/pm-case-studies/pm-case-studies.component';
import { SummaryNotesComponent } from './summary-notes/summary-notes.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProjectShortlistedDetailsComponent } from './project-shortlisted-details/project-shortlisted-details.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NewAllProjectDetailsComponent } from './new-all-project-details/new-all-project-details.component';
import { ExpiredProjectListComponent } from './expired-project-list/expired-project-list.component';
import { ExpiredProjectDetailsComponent } from './expired-project-details/expired-project-details.component';
import { ShortlistedSupplierProjectDetailsComponent } from './shortlisted-supplier-project-details/shortlisted-supplier-project-details.component';
import { ShortlistedSupplierProjectListComponent } from './shortlisted-supplier-project-list/shortlisted-supplier-project-list.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectManagerRoutingModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxSliderModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [
    ProjectManagerComponent,
    ProjectManagerHomeComponent,
    ProjectManagerHeaderComponent,
    ProjectMangerHeaderTwoComponent,
    ProjectManagerCloseProjectListComponent,
    ProjectManagerAllProjectListComponent,
    ProjectManagerMatchProjectListComponent,
    AllProjectDetailsComponent,
    MatchProjectDetailsComponent,
    ProjectCloseDetailsComponent,
    ProjectManagerSummaryDetailComponent,
    ProjectMangerProfileComponent,
    PmShortlistedProjectsComponent,
    PmCaseStudiesComponent,
    SummaryNotesComponent,
    ProjectShortlistedDetailsComponent,
    NewAllProjectDetailsComponent,
    ExpiredProjectListComponent,
    ExpiredProjectDetailsComponent,
    ShortlistedSupplierProjectDetailsComponent,
    ShortlistedSupplierProjectListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class ProjectManagerModule { }
