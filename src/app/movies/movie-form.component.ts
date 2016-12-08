import {Component, OnInit} from '@angular/core';
import {Movie} from "./movie.entity";
import {Params, ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "./movie.service";

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit{
  private selectedMovie: Movie;
  private errormessage: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router){}

  ngOnInit():void
  {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.selectedMovie = Object.assign({}, this.movieService.getMovie(id))
    });
  }

  deleteMovie(): void
  {
    this.movieService.deleteMovie(this.selectedMovie._id).subscribe(
      (movie) => this.router.navigate(['/movies']),
      error => this.errormessage = <any> error);
  }

  onSubmit():void
  {
    //Edit
    if(this.selectedMovie._id)
    {
      this.movieService.updateMovie(this.selectedMovie).subscribe(
        () => this.router.navigate(['/movies']),
        error => this.errormessage = <any> error);
    }
    //Create
    else
    {
      this.movieService.createMovie(this.selectedMovie).subscribe(
        () => this.router.navigate(['/movies']),
        error => this.errormessage = <any> error);
    }
  }

}
