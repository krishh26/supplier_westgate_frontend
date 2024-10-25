import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidSubmissionComponent } from './bid-submission.component';
import { BidSubmissonHomeComponent } from './bid-submisson-home/bid-submisson-home.component';
import { BidQuestionDetailsUkComponent } from './bid-question-details-uk/bid-question-details-uk.component';
import { BidProjectsDetailsComponent } from './bid-projects-details/bid-projects-details.component';
import { BidProjectsAllComponent } from './bid-projects-all/bid-projects-all.component';
import { BidMatchedProjectsComponent } from './bid-matched-projects/bid-matched-projects.component';
import { BidQuestionDetailsComponent } from './bid-question-details/bid-question-details.component';
import { BidSubmissionRoutingModule } from './bid-submission.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { BidSubmissionHeaderComponent } from 'src/app/utility/shared/components/bid-submission-header/bid-submission-header.component';
import { BidHeaderComponent } from 'src/app/utility/shared/components/bid-header/bid-header.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BidSubmissionProfileComponent } from './bid-submission-profile/bid-submission-profile.component';

@NgModule({
  imports: [
    CommonModule,
    BidSubmissionRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ],
  declarations: [
    BidSubmissionComponent,
    BidSubmissonHomeComponent,
    BidQuestionDetailsUkComponent,
    BidProjectsDetailsComponent,
    BidProjectsAllComponent,
    BidMatchedProjectsComponent,
    BidQuestionDetailsComponent,
    BidSubmissionHeaderComponent,
    BidHeaderComponent,
    BidSubmissionProfileComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BidSubmissionModule { }
