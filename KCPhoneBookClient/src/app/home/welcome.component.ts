import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPerson } from '../persons/person';
import { PersonParameterService } from '../persons/person-parameter.service';
import { PersonService } from '../persons/person.service';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle = 'Filtering contact list';   
    
    listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredPersons: IPerson[];
    persons: IPerson[];

    constructor(private personService: PersonService) { }

    ngOnInit(): void {
        this.personService.getPersons().subscribe(
            (persons: IPerson[]) => {
                this.persons = persons;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
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
