import { Component, Input, OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SearchService }            from '../_services/search.service';
import { Person }                   from '../_models/person.model';
import { Address }                  from '../_models/address.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private person: Person;
  private address: Address;
  private loading = false;

  constructor(
    private searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params
        .switchMap((params: Params) => this.searchService.getPerson(+params['id']))
        .subscribe(person => {
          this.person = person;
          if (this.person) { this.address = person.address; }
        })
  }

  save(): void {
    this.loading = true;
    this.person.address = this.address;
    this.searchService.save(this.person);
    this.gotoSearch();
  }

  gotoSearch(): void {
    this.router.navigate(['/search'])
  }

}
