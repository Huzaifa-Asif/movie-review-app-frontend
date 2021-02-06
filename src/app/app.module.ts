import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import * as $ from 'jquery';
import { HomeComponent } from './pages/home/home.component';
import { FilmComponent } from './pages/film/film.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';


import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmDirectionModule } from 'agm-direction';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RestApiService } from './services/api/rest-api.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AsyncPipe } from '@angular/common';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { FilmAddComponent } from './pages/film-add/film-add.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginComponent } from './pages/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FilmComponent,
    FilmDetailComponent,
    FilmAddComponent,
    LoginComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule, 
    NgxSpinnerModule,
    NgxFileDropModule,
    HttpClientModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [ RestApiService, AsyncPipe,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
