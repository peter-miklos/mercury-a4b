import { MercuryA4Page }        from './app.po';
import { browser, element, by } from 'protractor';

describe('mercury-a4 App', () => {
  let page: MercuryA4Page;

  beforeEach(() => {
    page = new MercuryA4Page();
    page.navigateTo("/");
  });

  it("displays the app title in the toolbar", () => {
    expect(page.getElemContent("title")).toBe("mercury-a4");
  });

  it("displays search md icon in the toolbar", () => {
    expect(page.getElemContent("search-icon")).toEqual("search");
  })

  it("navigates to search page if search icon is clicked", () => {
    element(by.css("a")).click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/search");
  })
});
