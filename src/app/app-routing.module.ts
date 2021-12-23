import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserContentComponent } from './user-content/user-content.component';
import { CanActivateOpenPagesGuard } from './../guards/can-activate-open-pages.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [


   { path: '', component: UserContentComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  //   // canActivate: [CanActivateOpenPagesGuard]
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  //   // canActivate: [CanActivateOpenPagesGuard]
  // }  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
