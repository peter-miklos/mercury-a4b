import { MercuryA4Page }        from '../app.po';
import { browser, element, by } from 'protractor';

describe("Search feature", () => {
  let page: MercuryA4Page;
  let allPersons: any = {};

  beforeEach(() => {
    page = new MercuryA4Page();
    page.navigateTo("/search");
    allPersons = element.all(by.css("md-list-item"));
  })

  it('displays Search in the h2 tag', () => {
    expect(element(by.css("h2")).getText()).toEqual('Search');
  });

  it('displays all persons if home button is clicked', () => {
    element(by.css("button#show-all")).click();

    expect(allPersons.count()).toBe(3);
    expect(page.getElemContent("name-phone-1")).toBeDefined();
    expect(page.getElemContent("name-phone-2")).toBeDefined();
    expect(page.getElemContent("name-phone-3")).toBeDefined();
  })

  it("displays all persons if '*' is searched", () => {
    element(by.css("input#query")).sendKeys("*");
    element(by.css("button#search")).click();

    expect(allPersons.count()).toBe(3);
    expect(page.getElemContent("name-phone-1")).toBeDefined();
    expect(page.getElemContent("name-phone-2")).toBeDefined();
    expect(page.getElemContent("name-phone-3")).toBeDefined();
  })

  it("displays all persons if no search term is added during search", () => {
    element(by.css("input#query")).sendKeys("");
    element(by.css("button#search")).click();

    expect(allPersons.count()).toBe(3);
    expect(page.getElemContent("name-phone-1")).toBeDefined();
    expect(page.getElemContent("name-phone-2")).toBeDefined();
    expect(page.getElemContent("name-phone-3")).toBeDefined();
  })

  it("finds the person if its data is searched", () => {
    element(by.css("input#query")).sendKeys("bob");
    element(by.css("button#search")).click();

    expect(allPersons.count()).toBe(1);
    expect(page.getElemContent("name-phone-1")).toBeDefined();
    expect(element(by.id("name-phone-2")).isPresent()).toBeFalsy();
    expect(element(by.id("name-phone-3")).isPresent()).toBeFalsy();
  });

  it("informs user if search was not successfull", () => {
    element(by.css("input#query")).sendKeys("ccc");
    element(by.css("button#search")).click();

    expect(allPersons.count()).toBe(0);
    expect(page.getElemContent("no-result")).toBeDefined();
    expect(page.getElemContent("no-result")).toBe("No results found");
  })

  it("opens the edit page if one of the persons name clicked", () => {
    element(by.css("button#show-all")).click();
    element(by.css("a#name-3")).click();

    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/edit/3");
  })

})
