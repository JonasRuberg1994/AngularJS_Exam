import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//routing
import { routing } from "./app-routing.module";

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
    routing
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
