import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectCoOrdinatorComponent } from './project-co-ordinator.component';
import { ProjectCoOrdinatorHomeComponent } from './project-co-ordinator-home/project-co-ordinator-home.component';
import { ProjectCoOrdinatorDetailsComponent } from './project-co-ordinator-details/project-co-ordinator-details.component';
import { ProjectCoOrdinatorQuestionDetailsComponent } from './project-co-ordinator-question-details/project-co-ordinator-question-details.component';
import { ProjectCoOrdinatorChatsComponent } from './project-co-ordinator-chats/project-co-ordinator-chats.component';
import { ProjectCoOrdinatorProjectListComponent } from './project-co-ordinator-project-list/project-co-ordinator-project-list.component';
import { ProjectCordinatorProfileComponent } from './project-cordinator-profile/project-cordinator-profile.component';


const routes: Routes = [
  {
    path: '',
    component: ProjectCoOrdinatorComponent,
    children: [
      {
        path: "project-coordinator-home",
        component: ProjectCoOrdinatorHomeComponent
      },
      {
        path: "project-coordinator-projects-list",
        component: ProjectCoOrdinatorProjectListComponent
      },
      {
        path: "project-coordinator-projects-details",
        component: ProjectCoOrdinatorDetailsComponent
      },
      {
        path: "project-coordinator-question-details",
        component: ProjectCoOrdinatorQuestionDetailsComponent
      },
      {
        path: "project-coordinator-chats",
        component: ProjectCoOrdinatorChatsComponent
      },
      {
        path: "project-coordinator-profile",
        component: ProjectCordinatorProfileComponent
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
export class ProjectCoOrdinateRoutingModule { }
