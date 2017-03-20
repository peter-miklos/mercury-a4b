import { MercuryA4Page }        from '../app.po';
import { browser, element, by } from 'protractor';

describe("New feature", () => {
  let page: MercuryA4Page;

  beforeEach(() => {
    page = new MercuryA4Page();
    page.navigateTo("/new");
  })

  
})
