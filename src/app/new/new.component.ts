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

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(): void {
    this.loading = true;
    this.person.address = this.address;
    this.searchService.save(this.person);
    this.gotoSearch();
  }

  gotoSearch(): void {
    this.router.navigate(['/search']);
  }

}
