import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router }     from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable }          from 'rxjs/Observable';

import { NewComponent }   from './new.component';
import { SearchService }  from '../_services/search.service';
import { FormControlService } from '../_services/form-control.service';

describe('NewComponent', () => {
  let component: NewComponent;
  let fixture: ComponentFixture<NewComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let searchService: SearchService;
  let formControlService: FormControlService;
  let router: Router;
  let persons: [];
  let newPerson: {};
  let personForm: FormGroup;

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
    personForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(12)]),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zip: new FormControl('', Validators.required)
      })
    })
    TestBed.configureTestingModule({
      declarations: [ NewComponent ],
      imports: [
        MaterialModule, FormsModule, HttpModule,
        RouterTestingModule, ReactiveFormsModule
      ],
      providers: [ SearchService, FormControlService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    searchService = de.injector.get(SearchService);
    formControlService = de.injector.get(FormControlService);
    router = de.injector.get(Router);
    spyOn(searchService, 'save');
    spyOn(searchService, 'getAll').and.returnValue(Observable.create(o => o.next(persons)));
    spyOn(formControlService, 'toFormGroup').and.returnValue(personForm);
    spyOn(component, 'gotoSearch');
    fixture.detectChanges();
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
      expect(searchService.save).toHaveBeenCalledWith(newPerson);
    });

    it("sets loading var to true when submit button is clicked", () => {
      el.querySelector('button#submit-person').click();
      expect(component.loading).toBe(true);
    })

    it("calls gotoSearch function after submitting new data", () => {
      el.querySelector('button#submit-person').click();
      expect(component.gotoSearch).toHaveBeenCalled();
    })

    it("sets the form validity to False if name is missing", () => {
      el.querySelector('input#name').value = "";
      el.querySelector('input#name').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if name is missing", () => {
      el.querySelector('input#name').value = "";
      el.querySelector('input#name').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if name is too short", () => {
      el.querySelector('input#name').value = "Bob";
      el.querySelector('input#name').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if name is too short", () => {
      el.querySelector('input#name').value = "Bob";
      el.querySelector('input#name').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if phone is missing", () => {
      el.querySelector('input#phone').value = "";
      el.querySelector('input#phone').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if phone is missing", () => {
      el.querySelector('input#phone').value = "";
      el.querySelector('input#phone').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if phone is too short", () => {
      el.querySelector('input#phone').value = "500-555-11";
      el.querySelector('input#phone').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if phone is too short", () => {
      el.querySelector('input#phone').value = "500-555-11";
      el.querySelector('input#phone').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if street is missing", () => {
      el.querySelector('input#street').value = "";
      el.querySelector('input#street').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if street is missing", () => {
      el.querySelector('input#street').value = "";
      el.querySelector('input#street').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if city is missing", () => {
      el.querySelector('input#city').value = "";
      el.querySelector('input#city').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if city is missing", () => {
      el.querySelector('input#city').value = "";
      el.querySelector('input#city').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if state is missing", () => {
      el.querySelector('input#state').value = "";
      el.querySelector('input#state').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if state is missing", () => {
      el.querySelector('input#state').value = "";
      el.querySelector('input#state').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if state is too short", () => {
      el.querySelector('input#state').value = "N";
      el.querySelector('input#state').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if state is too short", () => {
      el.querySelector('input#state').value = "N";
      el.querySelector('input#state').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
    })

    it("sets the form validity to False if zip is missing", () => {
      el.querySelector('input#zip').value = "";
      el.querySelector('input#zip').dispatchEvent(new Event('input'));
      expect(component.person.invalid).toBeTruthy();
    })

    it("disables the submit button if zip is missing", () => {
      el.querySelector('input#zip').value = "";
      el.querySelector('input#zip').dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(el.querySelector('button#submit-person').disabled).toBeTruthy();
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
