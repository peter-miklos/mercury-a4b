import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Person }         from '../_models/person.model';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  getAll(): Observable<Person[]> {
    return this.http.get('/src/app/shared/search/data/people.json')
               .map((res: Response) => {
                 return this.addPersonsToSession(res.json());
               })
               .catch(this.handleError)
  }

  getPerson(id: number) {
    return this.getAll().map(data => {
      return data.find(p => p.id === id)
    });
  }

  search(q: string) {
    if(!q || q === "*") {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().map(data => {
      let results: any[] = [];
      data.map(item => {
        if (JSON.stringify(item).toLowerCase().includes(q)) {
          results.push(item);
        }
      });
      return results;
    });
  }

  save(person: any = {}): void {
    let persons = JSON.parse(sessionStorage.getItem('persons'));
    let index = persons.findIndex(p => p.id === person.id)
    if (index != -1) {
      persons.splice(index, 1);
      persons.push(person);
      sessionStorage.setItem('persons', JSON.stringify(persons));
    }
  }

  private addPersonsToSession(data: any) {
    data = data.sort((a, b) => a.name - b.name);
    sessionStorage.getItem('persons') ? sessionStorage.getItem('persons')
          : sessionStorage.setItem('persons', JSON.stringify(data));
    return JSON.parse(sessionStorage.getItem('persons'));
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error["_body"] || JSON.stringify(error);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
