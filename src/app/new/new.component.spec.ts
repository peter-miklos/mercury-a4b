import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router }     from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable }          from 'rxjs/Observable';

import { NewComponent }   from './new.component';
import { SearchService }  from '../_services/search.service';
// import { Person }         from '../_models/person.model';
// import { Address }        from '../_models/address.model';

describe('NewComponent', () => {
  let component: NewComponent;
  let fixture: ComponentFixture<NewComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let searchService: SearchService;
  let router: Router;
  // let person: Person;
  let persons: [];
  let newPerson: {};
  // let emptyPerson: {};
  // let emptyAddress: {};

  beforeEach(async(() => {
    persons = [
      {
        "id": 1,
        "name": "Bob Smith",
        "phone": "843-555-1234",
        "address": {
          "street": "123 North Kings Highway",
          "city": "Myrtle Beach",
          "state": "SC",
          "zip": "29577"
        }
      },
      {
        "id": 2,
        "name": "Jim Smith",
        "phone": "843-555-2345",
        "address": {
          "street": "321 North Kings Highway",
          "city": "Myrtle Beach",
          "state": "SC",
          "zip": "29577"
        }
      }
    ];
    newPerson = {
      "id": 3,
      "name": "Joe Smith",
      "phone": "843-555-4321",
      "address": {
        "street": "321 London Road",
        "city": "Bath",
        "state": "NJ",
        "zip": "55555"
      }
    };
    // emptyPerson = {
    //   "id": "",
    //   "name": "",
    //   "phone": "",
    //   "address": {}
    // };
    // emptyAddress = {
    //   "street": "",
    //   "city": "",
    //   "state": "",
    //   "zip": ""
    // };
    TestBed.configureTestingModule({
      declarations: [ NewComponent ],
      imports: [
        MaterialModule, FormsModule, HttpModule,
        RouterTestingModule
      ],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    searchService = de.injector.get(SearchService);
    router = de.injector.get(Router);
    // person = de.injector.get(Person);
    spyOn(searchService, 'save');
    spyOn(searchService, 'getAll').and.returnValue(Observable.create(o => o.next(persons)));
    spyOn(component, 'gotoSearch');
    fixture.detectChanges();
    // spyOn(router, 'navigate');
    // spyOn(Person.prototype).and.returnValue(emptyPerson);
  });

  describe("Init", () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('calls the searchService.getAll method on init', () => {
      component.ngOnInit();
      expect(searchService.getAll).toHaveBeenCalled();
    })
  })

  describe("save person", () => {
    beforeEach(async(() => {
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
    }))

    it("calls the searchService.save method with new data if submit button clicked", () => {
      el.querySelector('button#submit-person').click();
      fixture.detectChanges();
      expect(searchService.save).toHaveBeenCalledWith(component.person);
    });

    it("sets loading var to true when submit button is clicked", () => {
      el.querySelector('button#submit-person').click();
      expect(component.loading).toBe(true);
    })

    it("calls gotoSearch function after submitting new data", () => {
      el.querySelector('button#submit-person').click();
      expect(component.gotoSearch).toHaveBeenCalled();
    })
  })

  describe("Back to search", () => {
    it("calls gotoSearch function if Back to Search button clicked", () => {
      el.querySelector('button#back-to-search').click();
      expect(component.gotoSearch).toHaveBeenCalled();
    })

    xit("navigates to search view if 'Back to Search' button clicked", () => {
      spyOn(router, 'navigate');
      fixture.detectChanges();
      el.querySelector('button#back-to-search').click();
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['/search']);
    })
  })
});
