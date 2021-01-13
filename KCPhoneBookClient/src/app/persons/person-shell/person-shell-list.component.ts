import { Component, OnInit, OnDestroy } from '@angular/core';

import { IPerson } from '../person';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-person-shell-list',
  templateUrl: './person-shell-list.component.html'
})
export class PersonShellListComponent implements OnInit, OnDestroy {
  pageTitle = 'People';
  errorMessage: string;
  persons: IPerson[];
  selectedPerson: IPerson | null;
  sub: Subscription;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.sub = this.personService.selectedPersonChanges$.subscribe(
      selectedPerson => this.selectedPerson = selectedPerson
    );

    this.personService.getPersons().subscribe({
      next: (persons: IPerson[]) => {
        this.persons = persons;
      },
      error: err => this.errorMessage = err
    });
  }

  onSelected(person: IPerson): void {
    this.personService.changeSelectedPerson(person);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
