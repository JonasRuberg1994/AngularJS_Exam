import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Movie} from "../movies/movie.entity";

@Pipe ({
  name: 'searchMovie'
})

//I want to be able to inject this service into other components.
@Injectable()
export class SearchMovie implements PipeTransform
{
  // transform - accepts an input value followed by optional parameters and returns the transformed value
  transform(items: Movie[], args: string): any
  {
    //if there is any movies in the movie array then convert
    if (args && items.length > 0)
    {
      //store each item in a variable called itemsfound
      let itemsFound = items.filter(
        //converting the data we are searching with the data in the object
        item => item.title.toLowerCase().includes(args.toLowerCase()) ||
          item.year.toLowerCase().includes(args.toLowerCase()) ||
          item.director.toLowerCase().includes(args.toLowerCase()) ||
          item.genre.toLowerCase().includes(args.toLowerCase())
      );

      //if there is any movies then return the items that is found
      if (itemsFound && itemsFound.length > 0)
      {
        return itemsFound;
      }

      //no matches on search - show error message in the movie-list view
      return[-1];
    }

    //return the transformed value
    return items;
  }
}



