import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './home/contact-us.component';
import { HomeComponent } from './home/home.component';
import { SigninRedirectCallbackComponent } from './home/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from './home/signout-redirect-callback.component';
import { ProjectListComponent } from './projects/project-list.component';
import { ProjectComponent } from './projects/project.component';
import { UnauthorizedComponent } from './home/unauthorized.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'projects', component: ProjectListComponent},
    { path: 'project/:projectId', component: ProjectComponent },
    { path: 'signin-callback', component: SigninRedirectCallbackComponent },
    { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
    { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
