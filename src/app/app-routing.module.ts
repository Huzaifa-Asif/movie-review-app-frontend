import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmAddComponent } from './pages/film-add/film-add.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';

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
  }
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
