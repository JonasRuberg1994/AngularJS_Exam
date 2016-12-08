import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {MovieListComponent} from "./movies/movie-list.component";
import {MovieFormComponent} from "./movies/movie-form.component";


const routes: Routes = [

  //index
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  //home page
  {
    path: 'home',
    component: HomeComponent
  },

  //about page
  {
    path: 'about',
    component: AboutComponent
  },

  //movies page
  {
    path: 'movies',
    component: MovieListComponent
  },

  //new movie
  {
    path: 'movie',
    component: MovieFormComponent
  },

  //edit movie
  {
    path: 'movie/:id',
    component: MovieFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class MovielistRoutingModule { }

export const routing = RouterModule.forRoot(routes);
