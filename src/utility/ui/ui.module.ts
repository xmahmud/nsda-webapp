import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ButtonComponent } from './button/button.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { InputDigitComponent } from './input-digit/input-digit.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
@NgModule({
  declarations: [
    LoaderComponent, 
    ButtonComponent, 
    SnackBarComponent, 
    ProgressBarComponent, 
    ProgressBarComponent, 
    InputComponent, 
    InputDigitComponent, 
    CheckboxComponent],
  exports: [LoaderComponent, 
    ButtonComponent, 
    SnackBarComponent, 
    InputComponent,
    ProgressBarComponent,
    InputDigitComponent,
    CheckboxComponent],
  entryComponents: [SnackBarComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class UIModule { }
