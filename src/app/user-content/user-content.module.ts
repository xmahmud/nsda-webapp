import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContentComponent } from './user-content.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: UserContentComponent,
    // canActivate: [AuthGuard],
    children: [      
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterModule.forRoot(routes, { enableTracing: false, relativeLinkResolution: 'legacy' })

  ]
})
export class UserContentModule { }
