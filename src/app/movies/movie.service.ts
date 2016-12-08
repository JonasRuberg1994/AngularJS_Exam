import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Movie} from "./movie.entity";

@Injectable() //so we can use it all over the place
export class MovieService {
  private movies: Movie[];
  private url: string = "http://localhost:3000/movies";

  constructor(private http: Http) {}

  //GET ALL MOVIES
  public getAllMovies(): Observable<Movie[]> {
    return this.http.get(this.url)
      .map((res: Response) => {
        let data = res.json();
        this.movies = data;
        return data || {};
      })
      .catch(this.handleError);
  }

  // Clones the found internship obj.
  public getMovie(id: string): Movie {
    let movie = this.movies.find(movie => movie._id === id);
    if (movie) {
      return this.copyMovieObject(movie);
    }
    return <Movie>{}; // returnng "empty" internship obj.
  }

  //ADD MOVIE
  public createMovie(movie): Observable<Movie>  {
    let options = this.getOptionsObj();

    return this.http.post(this.url, movie, options)
      .map((res: Response) => {
        let createdMovie = res.json();
        this.movies.push(createdMovie);
      })
      .catch(this.handleError);
  }

  //UPDATE MOVIE
  public updateMovie(movie): Observable<string> {
    let options = this.getOptionsObj();

    return this.http.put(this.url + "/" + movie._id, movie, options)
      .map((res: Response) => {
        let index = this.find(movie._id);
        this.movies[index] = movie;
      })
      .catch(this.handleError);
  }

  //DELETE MOVIE
  public deleteMovie(id: string): Observable<string> {
    let options = this.getOptionsObj();

    return this.http.delete(this.url + "/" + id, options)
      .map((res: Response) => {
        let index = this.find(id);
        this.movies.splice(index, 1);
      })
      .catch(this.handleError);
  }

  //FIND MOVIE WITH SPECIFIC ID
  private find(id: string): number {
    for(let i=0; i < this.movies.length; i++) {
      if (this.movies[i]._id === id) {
        return i;
      }
    }
    return -1;
  }

  //ERROR MESSAGE
  private handleError(error: Response | any) {
    return Observable.throw("some error message");
  }

  //HEADERS
  private getOptionsObj(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

  private copyMovieObject(movieToCopy: Movie): Movie {
    let movie = Object.assign({}, movieToCopy);
    return movie;
  }
}
