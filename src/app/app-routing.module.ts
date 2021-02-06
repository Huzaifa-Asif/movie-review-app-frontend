import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmAddComponent } from './pages/film-add/film-add.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full'
  },
  {
    path: 'films',
    component : HomeComponent
  },
  {
    path: 'films/create',
    component : FilmAddComponent
  },
  {
    path: 'films/:id',
    component : FilmDetailComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'register_user',
    component : RegisterUserComponent
  },
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
