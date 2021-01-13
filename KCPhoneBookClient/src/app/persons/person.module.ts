import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PersonListComponent } from './person-list.component';
import { PersonDetailComponent } from './person-detail.component';

import { PersonShellListComponent } from './person-shell/person-shell-list.component';
import { PersonShellComponent } from './person-shell/person-shell.component';
import { PersonEditComponent } from './edit/person-edit.component';
import { PersonEditGuard } from './edit/person-edit-guard.service';
import { PersonShellDetailComponent } from './person-shell/person-shell-detail.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: PersonShellComponent },      
      { path: ':id', component: PersonDetailComponent },
      {
        path: ':id/edit',
        canDeactivate: [PersonEditGuard],
        component: PersonEditComponent
      }
    ])
  ],
  declarations: [
    PersonListComponent,
    PersonDetailComponent,
    PersonEditComponent,
    PersonShellComponent,
    PersonShellListComponent,
    PersonShellDetailComponent
  ]
})
export class PersonModule { }
