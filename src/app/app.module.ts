import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserContentComponent } from './user-content/user-content.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/utility/http.service';
import { ModalService } from 'src/utility/modal.service';
import { LocalStorageService } from 'src/utility/local-storage.service';
import { UserService } from 'src/services/user.service';
import { SessionStorageService } from './../utility/session-storage.service';
import { BroadcastService } from './../utility/broadcast.service';
import { CanActivateOpenPagesGuard } from './../guards/can-activate-open-pages.guard';
import { AuthGuard } from './../guards/auth.guard';
import {AuthenticatedDirective} from './shared/authenticated.directive'
import { UIModule } from './../utility/ui/ui.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    UserContentComponent,
    AuthenticatedDirective,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    // SharedModule,
    UIModule,
    // NgModule,
    BrowserAnimationsModule,
    
  ],
  providers: [
    HttpService,
    ModalService,
    BroadcastService,
    LocalStorageService,
    SessionStorageService,
    UserService,
    CanActivateOpenPagesGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
