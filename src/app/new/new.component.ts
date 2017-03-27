import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { SearchService }     from '../_services/search.service';
import { Person }            from '../_models/person.model';
import { Address }           from '../_models/address.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  private person: Person;
  private address: Address;
  private loading = false;
  private persons: Person[];

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {
    this.person = new Person();
    this.address = new Address();
  }

  ngOnInit() {
    this.searchService.getAll().subscribe(
      data => {
        this.persons = this.getSortedPersons(data);
      },
      error => console.error(error)
    );
  }

  submit(): void {
    this.loading = true;
    this.person.id = this.getNextId();
    this.person.address = this.address;
    this.searchService.save(this.person);
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
