import { RouterModule, Routes }   from '@angular/router';

import { SearchComponent }        from './search/search.component';
import { EditComponent }          from './edit/edit.component';
import { NewComponent }           from './new/new.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent },
  {path: 'edit/:id', component: EditComponent },
  {path: 'new', component: NewComponent },
  {path: '', redirectTo: '/search', pathMatch: 'full' }
]

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);
