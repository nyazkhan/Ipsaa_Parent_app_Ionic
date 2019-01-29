import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [


  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'gallery', loadChildren: './pages/gallery/gallery.module#GalleryPageModule' },
  { path: 'sharingsheet', loadChildren: './pages/sharing-sheet/sharing-sheet.module#SharingSheetPageModule' },
  { path: 'activities', loadChildren: './pages/activities/activities.module#ActivitiesPageModule' },
  { path: 'support', loadChildren: './pages/support/support.module#SupportPageModule' },
  { path: 'foodmenu', loadChildren: './pages/food-menu/food-menu.module#FoodMenuPageModule' },
  { path: 'attendance', loadChildren: './pages/attendance/attendance.module#AttendancePageModule' },
  { path: 'fee', loadChildren: './pages/fee/fee.module#FeePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  {
    path: '**',
    redirectTo: '/page404'
  },
  {
    path: 'page404',
    component: Page404Component
  },
  { path: 'list', loadChildren: './pages/list/list.module#ListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
