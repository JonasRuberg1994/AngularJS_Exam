import { Component, OnInit } from '@angular/core';
import { Movie } from "./movie.entity";
import { MovieService } from "./movie.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit{
  private movies: Movie[]; // property - movies is an array of movies
  private message: string; // property - message of type string

  // constructor with injected service - calls that service to fetch and save data
  constructor(
    private movieService: MovieService
  ){}

  // calling the movieservice to get the movies inside lifecycle hook
  ngOnInit()
  {
    // return observable of movie data - to listen for events in this stream subscribe to the observable
    this.movieService.getAllMovies()
      .subscribe( //subscribe - specify a success event(moviedata) or a fail event(error)
        movie => this.movies = movie, //succesfull part - return the movies
        err => this.message = err //failure part - errors if there is any
    )
  }
}
