import { Component, OnInit }      from '@angular/core';

import { SearchService }  from '../_services/search.service';
import { Person }         from '../_models/person.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  searchResults: Person[];

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  search(): void {
    this.searchService.search(this.query).subscribe(
      data => { this.searchResults = data; },
      error => console.error(error)
    )
  }

  showAll(): void {
    this.searchService.getAll().subscribe(
      data => {
        this.searchResults = data;
        this.query = null;
      },
      error => console.error(error)
    )
  }
}
