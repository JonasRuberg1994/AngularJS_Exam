import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {MovieListComponent} from "./movies/movie-list.component";
import {MovieFormComponent} from "./movies/movie-form.component";


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' }, //direct to home page
  { path: 'home', component: HomeComponent }, //home page
  { path: 'about', component: AboutComponent }, //about page
  { path: 'movies', component: MovieListComponent }, //movies page
  { path: 'movie', component: MovieFormComponent }, //new movie
  { path: 'movie/:id', component: MovieFormComponent } //edit movie

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //performs the initial navigation based on the current browser URL.
  exports: [RouterModule], // access to the Router declarables such as RouterLink and RouterOutlet
  providers: []
})
export class AppRoutingModule { }

