import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidSubmissionComponent } from './bid-submission.component';
import { BidSubmissonHomeComponent } from './bid-submisson-home/bid-submisson-home.component';
import { BidQuestionDetailsUkComponent } from './bid-question-details-uk/bid-question-details-uk.component';
import { BidProjectsDetailsComponent } from './bid-projects-details/bid-projects-details.component';
import { BidProjectsAllComponent } from './bid-projects-all/bid-projects-all.component';
import { BidMatchedProjectsComponent } from './bid-matched-projects/bid-matched-projects.component';
import { BidQuestionDetailsComponent } from './bid-question-details/bid-question-details.component';
import { BidSubmissionProfileComponent } from './bid-submission-profile/bid-submission-profile.component';

const routes: Routes = [
    {
        path: '',
        component: BidSubmissionComponent,
        children: [
            {
                path: "bid-submission-home",
                component: BidSubmissonHomeComponent
            },
            {
                path: "bid-question-details-uk",
                component: BidQuestionDetailsUkComponent
            },
            {
                path: "bid-projects-details",
                component: BidProjectsDetailsComponent
            },
            {
                path: "bid-projects-all",
                component: BidProjectsAllComponent
            },
            {
                path: "bid-matched-projects",
                component: BidMatchedProjectsComponent
            },
            {
                path: "bid-question-details",
                component: BidQuestionDetailsComponent
            },
            {
              path: "profile-setting",
              component: BidSubmissionProfileComponent
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
export class BidSubmissionRoutingModule { }
