import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmAddComponent } from './pages/film-add/film-add.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { WeatherDetailComponent } from './pages/weather-detail/weather-detail.component';

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
    path: 'search/:search_title',
    component : SearchComponent
  },
  {
    path: 'weather/:woeid',
    component : WeatherDetailComponent
  }
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
