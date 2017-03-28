import { Component, Input, OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup }                      from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { SearchService }            from '../_services/search.service';
import { FormControlService }       from '../_services/form-control.service';
import { Person }                   from '../_models/person.model';
import { Address }                  from '../_models/address.model';

@Component({
  selector: 'app-edit',
  templateUrl: '../new/new.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  private person: FormGroup;
  private loading = false;

  constructor(
    private searchService: SearchService,
    private formControlService: FormControlService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.person = this.formControlService.toFormGroup();
    this.activatedRoute.params
        .switchMap((params: Params) => this.searchService.getPerson(+params['id']))
        .subscribe(person => {
          this.person = this.formControlService.toFormGroup(person);
        })
  }

  submit(model: Person): void {
    this.loading = true;
    this.searchService.save(model);
    this.gotoSearch();
  }

  gotoSearch(): void {
    this.router.navigate(['/search'])
  }
}
