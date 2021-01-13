import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { IPerson } from '../person';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-person-shell-detail',
    templateUrl: './person-shell-detail.component.html'
})
export class PersonShellDetailComponent implements OnInit, OnDestroy {
    pageTitle = 'Person Detail';

    person: IPerson | null;
    sub: Subscription;

    constructor(private personService: PersonService) { }

    ngOnInit() {
        this.sub = this.personService.selectedPersonChanges$.subscribe(
            selectedPerson => this.person = selectedPerson
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
