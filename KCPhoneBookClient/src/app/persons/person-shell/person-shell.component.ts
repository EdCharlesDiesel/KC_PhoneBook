import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../person.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './person-shell.component.html'
})
export class PersonShellComponent implements OnInit, OnDestroy {
    pageTitle = 'Contacts';
    monthCount: number;
    sub: Subscription;

    constructor(private personService: PersonService) { }

    ngOnInit() {
        this.sub = this.personService.selectedPersonChanges$.subscribe(
            // selectedPerson => {
            //     if (selectedPerson) {
            //         const start = new Date(selectedPerson.releaseDate);
            //         const now = new Date();
            //         this.monthCount = now.getMonth() - start.getMonth()
            //             + (12 * (now.getFullYear() - start.getFullYear()));
            //     } else {
            //         this.monthCount = 0;
            //     }}
            );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
