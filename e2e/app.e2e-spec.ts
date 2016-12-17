import { BookiFrontendAngularPage } from './app.po';

describe('booki-frontend-angular App', function() {
  let page: BookiFrontendAngularPage;

  beforeEach(() => {
    page = new BookiFrontendAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
