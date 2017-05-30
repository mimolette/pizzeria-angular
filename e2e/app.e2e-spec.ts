import { PizzariaAppClientPage } from './app.po';

describe('pizzaria-app-client App', () => {
  let page: PizzariaAppClientPage;

  beforeEach(() => {
    page = new PizzariaAppClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
