import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute, Router} from "@angular/router";
import {Movie} from "./movie.entity";
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit{
  private selectedMovie: Movie; //property - store the selectedmovies on an instance of the movie class - copy
  private errormessage: string; //property - shows errormessage if there is any

  // constructor with injected services
  constructor(
    private activatedRoute: ActivatedRoute, //retrieve the parameters for the route, pull the movie id from the parameters and retrieve the movie to display.
    private movieService: MovieService, //to fetch and save data
    private router: Router //for navigation
  ){}

  ngOnInit():void
  {
    //params observable - to extract the id parameter value from the activatedroute service and use the movieservice to fetch the movie with that id
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.selectedMovie = Object.assign({}, this.movieService.getMovie(id))
    });
  }

  deleteMovie(): void
  {
    //DELETE
    // return observable of movie data - to listen for events in this stream subscribe to the observable
    this.movieService.deleteMovie(this.selectedMovie._id)
      .subscribe( //subscribe - specify a success event(moviedata) or a fail event(error)
        () => this.router.navigate(['/movies']), //success event - navigate to movies
        error => this.errormessage = <any> error); //error event - errors if there is any
  }

  onSubmit():void
  {
    //EDIT
    if(this.selectedMovie._id)
    {
      // return observable of movie data - to listen for events in this stream subscribe to the observable
      this.movieService.updateMovie(this.selectedMovie)
        .subscribe( //subscribe - specify a success event(moviedata) or a fail event(error)
          () => this.router.navigate(['/movies']), //success event - navigate to movies
          error => this.errormessage = <any> error); //error event - errors if there is any
    }
    //CREATE
    else
    {
      // return observable of movie data - to listen for events in this stream subscribe to the observable
      this.movieService.createMovie(this.selectedMovie)
        .subscribe( //subscribe - specify a success event(moviedata) or a fail event(error)
          () => this.router.navigate(['/movies']), //success event - navigate to movies
          error => this.errormessage = <any> error); //error event - errors if there is any
    }
  }

}
