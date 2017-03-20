import { browser, element, by } from 'protractor';

export class MercuryA4Page {
  navigateTo(link: string) {
    return browser.get(link);
  }

  getParagraphText() {
    return element(by.css('h2')).getText();
  }

  getElemContent(id: string) {
    return element(by.id(`${id}`)).getText();
  }

  getNrmContent(cssString: string) {
    return element(by.css(cssString)).getAttribute('ng-reflect-model');
  }
}
