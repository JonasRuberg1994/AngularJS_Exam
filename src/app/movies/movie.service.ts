import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, Request} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; //operator
import 'rxjs/add/operator/toPromise'; //operator
import 'rxjs/add/operator/catch'; //operator

import {Movie} from "./movie.entity";

//I want to be able to inject this service into other components.
@Injectable()
export class MovieService {
  private movies: Movie[]; // property - the array of movies
  private url: string = "http://localhost:3000/movies"; // property - URL to web API

  //http client injected into the component (movieservice)
  constructor(private http: Http) {}

  //GET ALL MOVIES - GET REQUEST
  public getAllMovies(): Observable<Movie[]> { //returns an observable of the movie array
    return this.http.get(this.url) //using the get request to get movies
      .map((res: Response) => { //map the http.get response object to movies - The response data are in json string form.
        let data = res.json(); //parse it into JSON objects
        this.movies = data; //set array of movies to data
        return data || {}; //returning the data
      })
      .catch(this.handleError); //throws an error of any type if there is any
  }

  // GET MOVIE BY ID
  public getMovie(id: string): Movie {
    let movie = this.movies.find(movie => movie._id === id); //find movie object where id matches id in the method
    if (movie) {
      return this.copyMovieObject(movie); //returning a movie object
    }
    return <Movie>{}; //returnng "empty" movie object
  }

  //CREATE MOVIE - POST REQUEST (CREATE)
  public createMovie(movie): Observable<Movie>  {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // set content type to JSON
    let options = new RequestOptions({ headers: headers }); // create a request option

    return this.http.post(this.url, movie, options) //using the post request to create movie
      .map((res: Response) => { //map the http.get response object to movies - The response data are in json string form.
        let createdMovie = res.json(); //parse it into JSON objects
        this.movies.push(createdMovie); //adds the new object into the array
      })
      .catch(this.handleError); //throws an error of any type if there is any
  }

  //UPDATE MOVIE - PUT REQUEST (UPDATE)
  public updateMovie(movie): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // set content type to JSON
    let options = new RequestOptions({ headers: headers }); // create a request option

    return this.http.put(this.url + "/" + movie._id, movie, options) //using the put request
      .map((res: Response) => { //map the http.put response object to movies - The response data are in json string form.
        let index = this.find(movie._id); //call the method find and find the movie id
        this.movies[index] = movie; //update the movie at the given index
      })
      .catch(this.handleError); //throws an error of any type if there is any
  }

  //DELETE MOVIE - DELETE REQUEST (DELETE)
  public deleteMovie(id: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // set content type to JSON
    let options = new RequestOptions({ headers: headers }); // create a request option

    return this.http.delete(this.url + "/" + id, options) //getting the movie id
      .map((res: Response) => { //map the http.delete response object to movies - The response data are in json string form.
        let index = this.find(id); //call the method find and find the movie id
        this.movies.splice(index, 1); //remove the single movie from the array of movies
      })
      .catch(this.handleError); //throws an error of any type if there is any
  }

  //FIND ID OF A MOVIE
  private find(id: string): number {
    for(let i=0; i < this.movies.length; i++) { //iterate thru the movies array
      if (this.movies[i]._id === id) {
        return i;
      }
    }
    return -1;
  }

  //ERROR HANDLING
  private handleError(error: Response | any) {
    console.log(error);
    return Observable.throw("some error message");
  }

  //COPY MOVIE OBJECT
  private copyMovieObject(movieToCopy: Movie): Movie {
    let movie = Object.assign({}, movieToCopy); //copy the value - target object is the first parameter and is also used as the return value.
    return movie;
  }

}
