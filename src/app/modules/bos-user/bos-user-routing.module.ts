import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BossUserHomeComponent } from './boss-user-home/boss-user-home.component';
import { BossUserAddProjectComponent } from './boss-user-add-project/boss-user-add-project.component';
import { BossUserLiveProjectListingComponent } from './boss-user-live-project-listing/boss-user-live-project-listing.component';
import { BossUserViewProjectComponent } from './boss-user-view-project/boss-user-view-project.component';
import { BOSUserComponent } from './bos-user.component';
import { MailScreenshotAddEditComponent } from './mail-screenshot-add-edit/mail-screenshot-add-edit.component';
import { FioDocumentListComponent } from './fio-document-list/fio-document-list.component';
import { FioDocumentAddEditComponent } from './fio-document-add-edit/fio-document-add-edit.component';
import { BossUserBulkEntryComponent } from './boss-user-bulk-entry/boss-user-bulk-entry.component';
import { BossUserProfileComponent } from './boss-user-profile/boss-user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: BOSUserComponent,
    children: [
      {
        path: "home",
        component: BossUserHomeComponent
      },
      {
        path: "add-project",
        component: BossUserAddProjectComponent
      },
      {
        path: "project-list",
        component: BossUserLiveProjectListingComponent
      },
      {
        path: "view-project",
        component: BossUserViewProjectComponent
      },
      {
        path: "foi-document-list",
        component: FioDocumentListComponent
      },
      {
        path: "foi-document-add",
        component: FioDocumentAddEditComponent
      },
      {
        path: "mail-screenhot-add",
        component: MailScreenshotAddEditComponent
      },
      {
        path: "boss-user-bulk-entry",
        component: BossUserBulkEntryComponent
      },
      {
        path: "boss-user-profile",
        component: BossUserProfileComponent
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
export class BOSUserRoutingModule { }
