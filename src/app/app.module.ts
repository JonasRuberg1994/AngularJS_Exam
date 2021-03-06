//defines the application´s root module, we identify the external modules we´ll use in our application and
//declare the components to this module

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //forms module gives access to template driven
import { HttpModule } from '@angular/http';

//routing
import { AppRoutingModule } from "./app-routing.module";

//services
import { MovieService } from './movies/movie.service';

//pipes
import { SearchMovie } from './pipes/search-movie.pipe';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MovieListComponent} from './movies/movie-list.component';
import { MovieFormComponent } from './movies/movie-form.component';

//NgModule - this array contains the list of external modules used by our application
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MovieListComponent,
    MovieFormComponent,
    SearchMovie
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
