import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedComponent } from './featured.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserApiDataComponent } from './components/user-api-data/user-api-data.component';

const routes: Routes = [
  {
    path: "", component: FeaturedComponent, children: [
      { path: '', redirectTo: '/user-list', pathMatch: 'full' },
      { path: 'user-form', component: UserFormComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-api-list', component: UserApiDataComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedRoutingModule { }
