import { MercuryA4Page }        from '../app.po';
import { browser, element, by } from 'protractor';

describe("New feature", () => {
  let page: MercuryA4Page;

  beforeEach(() => {
    page = new MercuryA4Page();
    page.navigateTo("/new");
    element(by.css("input#name")).sendKeys("Jimmy Smith");
    element(by.css("input#phone")).sendKeys("601-555-3322");
    element(by.css("input#street")).sendKeys("test street");
    element(by.css("input#city")).sendKeys("test city");
    element(by.css("input#state")).sendKeys("NC");
    element(by.css("input#zip")).sendKeys("54321");
  })

  it("goes back to search view if 'Back to search' button clicked, with no change", () => {
    element(by.id("back-to-search")).click();
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/search");
  })

  it("redirects user to search view if submit button clicked", () => {
    element(by.id("submit-person")).click();
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/search");
  })

  it("saves new person's data if all attributes added and submit button clicked", () => {
    element(by.css("input#name")).clear();
    element(by.css("input#name")).sendKeys("George Smith");
    element(by.id("submit-person")).click();
    element(by.css("input#query")).sendKeys("George Smith");
    element(by.css("button#search")).click();
    expect(element.all(by.css("md-list-item")).count()).toBe(1);
    expect(page.getElemContent("name-phone-5")).toBe("George Smith (601-555-3322)");
    expect(page.getElemContent("ad-street-5")).toBe("test street");
    expect(page.getElemContent("ad-city-state-zip-5")).toBe("test city, NC 54321");
  })

  xit("person cannot be saved if name field is not filled", () => {
    element(by.css("input#name")).clear();
    expect(element(by.id("submit-person")).isEnabled()).toBeFalsy();
  })
})
