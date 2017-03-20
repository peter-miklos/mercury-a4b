import { RouterModule, Routes }   from '@angular/router';

import { SearchComponent }        from './search/search.component';
import { EditComponent }          from './edit/edit.component';

const routes: Routes = [
  {path: 'search', component: SearchComponent },
  {path: 'edit/:id', component: EditComponent },
  {path: '', redirectTo: '/search', pathMatch: 'full' }
]

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(routes);
