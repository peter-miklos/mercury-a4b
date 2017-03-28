import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { FormGroup } from '@angular/forms';

import { SearchService }     from '../_services/search.service';
import { FormControlService } from '../_services/form-control.service';
import { Person }            from '../_models/person.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  private person: FormGroup;
  private loading = false;
  private persons: Person[];

  constructor(
    private searchService: SearchService,
    private formControlService: FormControlService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.searchService.getAll().subscribe(
      data => {
        this.persons = this.getSortedPersons(data);
      },
      error => console.error(error)
    );
    this.person = this.formControlService.toFormGroup();
  }

  submit(model: Person): void {
    this.loading = true;
    model.id = this.getNextId();
    this.searchService.save(model);
    this.gotoSearch();
  }

  gotoSearch(): void {
    this.router.navigate(['/search']);
  }

  private getNextId() {
    let lastId = this.persons[0].id;
    return lastId + 1;
  }

  private getSortedPersons(data: Person[]): Person[] {
    return data.sort((a, b) => b.id - a.id);
  }

}
