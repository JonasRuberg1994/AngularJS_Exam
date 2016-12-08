import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Movie} from "../movies/movie.entity";

@Pipe ({
  name: 'searchMovie'
})

@Injectable()
export class SearchMovie implements PipeTransform
{
  //pass in the movie array
  transform(items: Movie[], args: string): any
  {
    //if there is any movies in the movie array then convert
    if (args && items.length > 0)
    {
      //converting into lower case -  store it in a variable called itemsfound
      let itemsFound = items.filter(

        //converting title year - director - genre
        item => item.title.toLowerCase().includes(args.toLowerCase()) ||
          item.year.toLowerCase().includes(args.toLowerCase()) ||
          item.director.toLowerCase().includes(args.toLowerCase()) ||
          item.genre.toLowerCase().includes(args.toLowerCase())
      );
      console.log(itemsFound);

      //if there is a item found then return it and it´s not empty
      if (itemsFound && itemsFound.length > 0)
      {
        return itemsFound;
      }
      console.log(itemsFound);
      console.log('returning -1');
      //display error message in movie-list view
      return[-1];
    }

    //return the transformed value
    return items;
  }
}



