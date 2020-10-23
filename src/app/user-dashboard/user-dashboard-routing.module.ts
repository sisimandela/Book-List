import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BookListComponent } from './book-list/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      children: [
        { path: 'bookList', component: BookListComponent },
        { path: '', component: DashboardComponent }
      ]
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
