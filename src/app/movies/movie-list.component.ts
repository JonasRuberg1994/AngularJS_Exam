import { Component, OnInit } from '@angular/core';
import { Movie } from "./movie.entity";
import { MovieService } from "./movie.service";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit{
  private movies: Movie[]; //takes in an array of objects
  private message: string; // show error message if there is any

  constructor(private movieService: MovieService){}

  ngOnInit()
  {
    this.movieService.getAllMovies().subscribe(
      movie => this.movies = movie,
      err => this.message = err
    )
  }
}
