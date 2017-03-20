/* tslint:disable:no-unused-variable */
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router }     from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { EditComponent } from './edit.component';
import { SearchService } from '../_services/search.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let searchService: SearchService;
  let router: Router;
  let person: {};
  let newPerson: {};

  beforeEach(async(() => {
    person = {
      "id": 1,
      "name": "Bob Smith",
      "phone": "843-555-1234",
      "address": {
        "street": "123 North Kings Highway",
        "city": "Myrtle Beach",
        "state": "SC",
        "zip": "29577"
      }
    };
    newPerson = {
      "id": 1,
      "name": "Jim Smith",
      "phone": "843-555-4321",
      "address": {
        "street": "321 London Road",
        "city": "Bath",
        "state": "NJ",
        "zip": "55555"
      }
    };
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        MaterialModule.forRoot(), FormsModule,
        HttpModule, RouterTestingModule
      ],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    searchService = de.injector.get(SearchService);
    router = de.injector.get(Router);
  });

  describe("person is not found", () => {
    beforeEach(() => {
      spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('calls the searchService.getPerson method on init', () => {
      component.ngOnInit();
      expect(searchService.getPerson).toHaveBeenCalled();
    })

    it('informs user if no person was found, undefined is returned by searchService', fakeAsync(() => {
      component.ngOnInit();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(el.querySelector('div#no-person-found').innerText).toBe("No person found.");
      })
    }));

    it("shows 'Submitting...' if the returning data by getPerson is in progress", () => {
      component.loading = true;
      fixture.detectChanges();

      expect(el.querySelector('div#loading').innerText).toBe("Submitting...");
    })

    it("navigates to search view if 'Back to Search' button clicked", () => {
      spyOn(router, 'navigate');
      fixture.detectChanges();
      el.querySelector('button#back-to-search').click();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['/search']);
    })
  });

  describe("person is found", () => {
    beforeEach(() => {
      spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(person));
      spyOn(searchService, 'save');
      spyOn(component, 'gotoSearch');
      spyOn(router, 'navigate');
      component.ngOnInit();
    });

    it("shows the person's details received from the searchService", async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(el.querySelector('h3').innerText).toBe(`${person["name"]} (id: ${person["id"]})`);
        expect(el.querySelector('input#name').getAttribute('ng-reflect-model')).toBe(person["name"]);
        expect(el.querySelector('input#phone').getAttribute('ng-reflect-model')).toBe(person["phone"]);
        expect(el.querySelector('input#street').getAttribute('ng-reflect-model')).toBe(person["address"]["street"]);
        expect(el.querySelector('input#city').getAttribute('ng-reflect-model')).toBe(person["address"]["city"]);
        expect(el.querySelector('input#state').getAttribute('ng-reflect-model')).toBe(person["address"]["state"]);
        expect(el.querySelector('input#zip').getAttribute('ng-reflect-model')).toBe(person["address"]["zip"]);
      })
    }))

    it("calls the searchService.save with the updated data if save button clicked", async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        el.querySelector('input#name').value = newPerson["name"];
        el.querySelector('input#name').dispatchEvent(new Event('input'));
        el.querySelector('input#phone').value = newPerson["phone"];
        el.querySelector('input#phone').dispatchEvent(new Event('input'));
        el.querySelector('input#street').value = newPerson["address"]["street"];
        el.querySelector('input#street').dispatchEvent(new Event('input'));
        el.querySelector('input#city').value = newPerson["address"]["city"];
        el.querySelector('input#city').dispatchEvent(new Event('input'));
        el.querySelector('input#state').value = newPerson["address"]["state"];
        el.querySelector('input#state').dispatchEvent(new Event('input'));
        el.querySelector('input#zip').value = newPerson["address"]["zip"];
        el.querySelector('input#zip').dispatchEvent(new Event('input'));
        fixture.detectChanges();
        el.querySelector('button#save-person').click();
        fixture.detectChanges();
        expect(searchService.save).toHaveBeenCalledWith(newPerson);
      })
    }))

    it("sets loading var to true when save button clicked", async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        el.querySelector('button#save-person').click();
        expect(component.loading).toBe(true);
      })
    }));

    it("gotoSearch function is called after saving person data", () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        el.querySelector('button#save-person').click();
        expect(component.gotoSearch).toHaveBeenCalled();
      })
    })
  });
});
