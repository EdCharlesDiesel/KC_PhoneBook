import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IPerson } from '../person';
import { PersonService } from '../person.service';

@Component({
    templateUrl: './person-edit.component.html',
    styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
    @ViewChild(NgForm, { static: true }) editForm: NgForm;
    pageTitle = 'Contact Edit';
    errorMessage: string;
    private originalPerson: IPerson;
    person: IPerson;

    get isDirty(): boolean {
        return this.editForm.dirty ? true : false;
    }

    constructor(private personService: PersonService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getPerson(id);
            }
        );
    }

    getPerson(id: number): void {
        this.personService.getPerson(id)
            .subscribe({
                next: person => this.onPersonRetrieved(person),
                error: err => this.errorMessage = err
            });
    }

    onPersonRetrieved(person: IPerson): void {        
        this.editForm.reset();

        this.originalPerson = person;
        this.person = Object.assign({}, person);

        if (this.person.id === 0) {
            this.pageTitle = 'Add Contact';
        } else {            
            this.pageTitle = `Edit Contact: ${this.person.firstName}`;
        }
    }

    cancel(): void {
        this.router.navigate(['/persons']);
    }

    deletePerson(): void {
        if (this.person.id) {            
                if (confirm(`Really delete contact: ${this.person.firstName}?`)) {
                this.personService.deletePerson(this.person.id)
                    .subscribe({
                        next: () => this.onSaveComplete(),
                        error: err => this.errorMessage = err
                    });
            }
        } else {            
            this.onSaveComplete();
        }
    }

    savePerson(): void {
        if (this.editForm.valid) {
            this.personService.savePerson(this.person)
                .subscribe({
                    next: () => {              
                        Object.keys(this.person).forEach(key =>
                            this.originalPerson[key] = this.person[key]
                        );
                        this.onSaveComplete();
                    },
                    error: err => this.errorMessage = err
                });
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(): void {
        this.editForm.reset(this.editForm.value);
        this.router.navigate(['/persons']);
    }
}
