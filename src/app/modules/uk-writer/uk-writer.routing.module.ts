import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UkWriterComponent } from './uk-writer.component';
import { UkWriterHomeComponent } from './uk-writer-home/uk-writer-home.component';
import { UkWriterQuestionDetailsEditComponent } from './uk-writer-question-details-edit/uk-writer-question-details-edit.component';
import { UkWriterQuestionDetailsComponent } from './uk-writer-question-details/uk-writer-question-details.component';
import { UkWriterProjectsDetailsComponent } from './uk-writer-projects-details/uk-writer-projects-details.component';
import { UkWriterProjectsAllComponent } from './uk-writer-projects-all/uk-writer-projects-all.component';
import { UkWriterMatchedProjectsComponent } from './uk-writer-matched-projects/uk-writer-matched-projects.component';
import { UkWriterSupplierListComponent } from './uk-writer-supplier-list/uk-writer-supplier-list.component';
import { UkWriterProfileComponent } from './uk-writer-profile/uk-writer-profile.component';


const routes: Routes = [
  {
    path: '',
    component: UkWriterComponent,
    children: [
      {
        path: "uk-writer-home",
        component: UkWriterHomeComponent
      },
      {
        path: "uk-writer-projects-details",
        component: UkWriterProjectsDetailsComponent
      },
      {
        path: "uk-writer-question-details",
        component: UkWriterQuestionDetailsComponent
      },
      {
        path: "uk-writer-question-details-edit",
        component: UkWriterQuestionDetailsEditComponent
      },
      {
        path: "uk-writer-matched-projects",
        component: UkWriterMatchedProjectsComponent
      },
      {
        path: "uk-writer-projects-all",
        component: UkWriterProjectsAllComponent
      },
      {
        path: "uk-writer-supplier-list",
        component: UkWriterSupplierListComponent
      },
      {
        path: "profile",
        component: UkWriterProfileComponent
      },
    ]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UkWriterRoutingModule { }
