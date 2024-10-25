import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';


const routes: Routes = [
    {
        path: '',
        component: UserProfileComponent,
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
export class UserProfileRoutingModule { }
