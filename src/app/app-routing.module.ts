import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './application/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule) },
  { path: 'resume', loadChildren: () => import('./application/application-routing.module').then(m => m.ApplicationRoutingModule) },
  // Wildcard route for a 404 page
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
