import { MercuryA4bPage } from './app.po';

describe('mercury-a4b App', () => {
  let page: MercuryA4bPage;

  beforeEach(() => {
    page = new MercuryA4bPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
