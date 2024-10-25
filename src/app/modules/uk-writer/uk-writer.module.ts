import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UkWriterComponent } from './uk-writer.component';
import { UkWriterHomeComponent } from './uk-writer-home/uk-writer-home.component';
import { UkWriterHeaderComponent } from 'src/app/utility/shared/components/uk-writer-header/uk-writer-header.component';
import { UkWriterMatchedProjectsComponent } from './uk-writer-matched-projects/uk-writer-matched-projects.component';
import { UkWriterProjectsAllComponent } from './uk-writer-projects-all/uk-writer-projects-all.component';
import { UkWriterProjectsDetailsComponent } from './uk-writer-projects-details/uk-writer-projects-details.component';
import { UkWriterQuestionDetailsEditComponent } from './uk-writer-question-details-edit/uk-writer-question-details-edit.component';
import { UkWriterRoutingModule } from './uk-writer.routing.module';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UkWriterSupplierListComponent } from './uk-writer-supplier-list/uk-writer-supplier-list.component';
import { UkWriterProfileComponent } from './uk-writer-profile/uk-writer-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    UkWriterComponent,
    UkWriterHomeComponent,
    UkWriterHeaderComponent,
    UkWriterMatchedProjectsComponent,
    UkWriterProjectsAllComponent,
    UkWriterProjectsDetailsComponent,
    UkWriterQuestionDetailsEditComponent,
    UkWriterQuestionDetailsEditComponent,
    UkWriterSupplierListComponent,
    UkWriterProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UkWriterRoutingModule,
    NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UkWriterModule { }
