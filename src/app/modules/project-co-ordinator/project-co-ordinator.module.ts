import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/utility/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectCoOrdinatorQuestionDetailsComponent } from './project-co-ordinator-question-details/project-co-ordinator-question-details.component';
import { ProjectCoOrdinatorHomeComponent } from './project-co-ordinator-home/project-co-ordinator-home.component';
import { ProjectCoOrdinatorDetailsComponent } from './project-co-ordinator-details/project-co-ordinator-details.component';
import { ProjectCoOrdinatorComponent } from './project-co-ordinator.component';
import { ProjectCoOrdinatorChatsComponent } from './project-co-ordinator-chats/project-co-ordinator-chats.component';
import { ProjectCoOrdinatorHeaderComponent } from 'src/app/utility/shared/components/project-co-ordinator-header/project-co-ordinator-header.component';
import { ProjectCoOrdinateRoutingModule } from './project-co-ordinator.routing.module';
import { ProjectCoOrdinatorProjectListComponent } from './project-co-ordinator-project-list/project-co-ordinator-project-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectCordinatorProfileComponent } from './project-cordinator-profile/project-cordinator-profile.component';

@NgModule({
  declarations: [
    ProjectCoOrdinatorQuestionDetailsComponent,
    ProjectCoOrdinatorHomeComponent,
    ProjectCoOrdinatorDetailsComponent,
    ProjectCoOrdinatorComponent,
    ProjectCoOrdinatorChatsComponent,
    ProjectCoOrdinatorHeaderComponent,
    ProjectCoOrdinatorProjectListComponent,
    ProjectCordinatorProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ProjectCoOrdinateRoutingModule,
    NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectCoOrdinatorModule { }
