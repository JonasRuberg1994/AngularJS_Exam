import { TestBed, async } from '@angular/core/testing';
import { SearchMovie } from "./search-movie.pipe";


describe('App: Movies', () => {
  beforeEach(() =>
  {
    //Filling in some static data
    this.movies =
      [
        {_id: '1', title:'Bond', year:'2005', director:'Per', genre:'Action'},
        {_id: '2', title:'Redemption', year:'2008', director:'Hans', genre:'Drama'},
        {_id: '3', title:'Up', year:'2010', director:'Helle', genre:'Horror'},
        {_id: '4', title:'Potter', year:'2016', director:'Berit', genre:'Science Fiction'}
      ];

    TestBed.configureTestingModule({
      declarations: [
        SearchMovie //declare the test pipe
      ],
    });
  });

  describe('SearchMovie', () => {

    //ARRANGE - setting up the conditions for the test
    let pipe = new SearchMovie();

    it('No search string returns input', () => {

      // transform - accepts an input value followed by optional parameters and returns the transformed value

      //ACT - performing the test
      let result = pipe.transform(this.movies, '');

      //ASSERT - verifying that the result was the one that was required
      expect(result.length).toBe(4);
    });

    it('Empty array returns empty array', () => {
      let result = pipe.transform([], 'Hi'); //empty array
      expect(result.length).toBe(0); //length should be at least 1
    });

    // SEARCH BY TITLE
    it('Partial match on title', () => {
      let result = pipe.transform(this.movies, 'Bo'); //partial match
      expect(result.length).toBe(1);
    });
    it('Exact match on title', () => {
      let result = pipe.transform(this.movies, 'Bond'); //exact match
      expect(result.length).toBe(1);
    });
    it('Exact match on title - case insensitive', () => {
      let result = pipe.transform(this.movies, 'BonD'); //exact match - case sensitive
      expect(result.length).toBe(1);
      expect(result[0]).not.toBe(-1);
    });
    it('No match on title', () => {
      let result = pipe.transform(this.movies, 'Bondie'); //no match
      expect(result.length).toBe(1);
      expect(result[0]).toBe(-1);
    });

  });
});




