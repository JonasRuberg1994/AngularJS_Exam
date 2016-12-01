import { MovielistPage } from './app.po';

describe('movielist App', function() {
  let page: MovielistPage;

  beforeEach(() => {
    page = new MovielistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
