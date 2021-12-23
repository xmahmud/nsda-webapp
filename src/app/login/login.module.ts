import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { UIModule } from '../../utility/ui/ui.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
     FormsModule,
    UIModule,
    // NgModule
    
    
  ],
  // exports: [LoginComponent]
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
