import { Component, OnInit, ViewChild } from '@angular/core';

import { IPerson } from './person';
import { PersonService } from './person.service';
import { PersonParameterService } from './person-parameter.service';


@Component({
    selector: 'kc-person list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
    pageTitle = 'Contact List';
    includeDetail = true;

    imageWidth = 50;
    imageMargin = 2;
    errorMessage: string;

    filteredPersons: IPerson[];
    persons: IPerson[];    

    get showImage(): boolean {
        return this.personParameterService.showImage;
    }
    set showImage(value: boolean) {
        this.personParameterService.showImage = value;
    }

    constructor(private personService: PersonService,
                private personParameterService: PersonParameterService) { }

    ngOnInit(): void {
        this.personService.getPersons().subscribe({
            next: (persons: IPerson[]) => {
                this.persons = persons;
                //this.filterComponent.listFilter =
                  //  this.personParameterService.filterBy;
            },
            error: err => this.errorMessage = err
        });
    }

    onValueChange(value: string): void {
        this.personParameterService.filterBy = value;
        this.performFilter(value);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredPersons = this.persons.filter((person: IPerson) =>
                person.firstName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredPersons = this.persons;
        }
    }
}
