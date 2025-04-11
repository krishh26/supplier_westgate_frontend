import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAdminComponent } from './supplier-admin.component';
import { ProjectsAllComponent } from './projects-all/projects-all.component';
import { ProjectsShortlistedComponent } from './projects-shortlisted/projects-shortlisted.component';
import { ProjectsAppliedComponent } from './projects-applied/projects-applied.component';
import { ProjectsMatchedComponent } from './projects-matched/projects-matched.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { TotalProjectsInCategoryComponent } from './total-projects-in-category/total-projects-in-category.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { ProjectsDetailsComponent } from './projects-details/projects-details.component';
import { ExpiredProjectComponent } from './expired-project/expired-project.component';
import { AppliedProjectsDetailsComponent } from './applied-projects-details/applied-projects-details.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CaseStudiesComponent } from './case-studies/case-studies.component';
import { AddCaseStudyComponent } from './add-case-study/add-case-study.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SupplierAdminProjectListingComponent } from './supplier-admin-project-listing/supplier-admin-project-listing.component';
import { SuppilerAdminChatComponent } from './suppiler-admin-chat/suppiler-admin-chat.component';
import { SupplierDashboardValueComponent } from './supplier-dashboard-value/supplier-dashboard-value.component';
import { SupplierDashboardHeaderComponent } from './supplier-dashboard-header/supplier-dashboard-header.component';
import { SupplierProjectSubmittedComponent } from './supplier-project-submitted/supplier-project-submitted.component';
import { SupplierProjectWorkInProgressComponent } from './supplier-project-work-in-progress/supplier-project-work-in-progress.component';
import { ProjectNotificationComponent } from 'src/app/utility/shared/common/project-notification/project-notification.component';
import { ProjectDetailsForAppliedComponent } from './project-details-for-applied/project-details-for-applied.component';
import { QuestionAnswerDetailsComponent } from './question-answer-details/question-answer-details.component';
import { ProjectListDashboardComponent } from './project-list-dashboard/project-list-dashboard.component';
import { ProjectDetailsDahboardComponent } from './project-details-dahboard/project-details-dahboard.component';
import { SupplierMyProjectsComponent } from './supplier-my-projects/supplier-my-projects.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ExpertiesListComponent } from './experties-list/experties-list.component';
import { SubExpertiesListComponent } from './sub-experties-list/sub-experties-list.component';


const routes: Routes = [
  {
    path: '',
    component: SupplierAdminComponent,
    children: [
      // {
      //   path: "projects-all",
      //   component: ProjectsAllComponent
      // },
      // {
      //   path: "projects-shortlisted",
      //   component: ProjectsShortlistedComponent
      // },
      // {
      //   path: "projects-applied",
      //   component: ProjectsAppliedComponent
      // },
      // {
      //   path: "projects-matched",
      //   component: ProjectsMatchedComponent
      // },
      {
        path: "project-list",
        component: SupplierAdminProjectListingComponent
      },
      {
        path: "dashboard-project-list",
        component: ProjectListDashboardComponent
      },
      {
        path: "dashboard-project-detail",
        component: ProjectDetailsDahboardComponent
      },
      {
        path: "project-list",
        component: SupplierAdminProjectListingComponent
      },
      {
        path: "add-casestudy",
        component: AddCaseStudyComponent
      },
      {
        path: "supplier-dashboard",
        component: SupplierDashboardComponent
      },
      {
        path: "supplier-home",
        component: SupplierHomeComponent
      },
      {
        path: "total-projects-in-category",
        component: TotalProjectsInCategoryComponent
      },
      {
        path: "applied-project-details",
        component: AppliedProjectsDetailsComponent
      },
      {
        path: "expired-project",
        component: ExpiredProjectComponent
      },
      {
        path: "projects-details",
        component: ProjectsDetailsComponent
      },
      {
        path: "projects-details-for-applied",
        component: ProjectDetailsForAppliedComponent
      },
      {
        path: "question-details",
        component: QuestionDetailsComponent
      },
      {
        path: "question-answer-details",
        component: QuestionAnswerDetailsComponent
      },
      {
        path: "manage-user",
        component: ManageUserComponent
      },
      {
        path: "add-user",
        component: AddUserComponent
      },
      {
        path: "case-studies-list",
        component: CaseStudiesComponent
      },
      {
        path: "supplier-user-profile",
        component: UserProfileComponent
      },
      {
        path: "chat",
        component: SuppilerAdminChatComponent
      },
      {
        path: "supplier-dashboard-value",
        component: SupplierDashboardValueComponent
      },
      {
        path: "supplier-dashboard-header",
        component: SupplierDashboardHeaderComponent
      },
      {
        path: "supplier-project-submitted",
        component: SupplierProjectSubmittedComponent
      },
      {
        path: "supplier-project-work-in-progress",
        component: SupplierProjectWorkInProgressComponent
      },
      {
        path: "notification",
        component: ProjectNotificationComponent
      },
      {
        path: "my-projects",
        component: SupplierMyProjectsComponent
      },
      {
        path: "change-password",
        component: ChangePasswordComponent
      },
      {
        path: "experties-list",
        component: ExpertiesListComponent
      },
      {
        path: "sub-experties-list",
        component: SubExpertiesListComponent
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
export class SupplierRoutingModule { }
