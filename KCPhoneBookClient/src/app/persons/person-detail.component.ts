import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IPerson } from './person';
import { PersonService } from './person.service';

@Component({
    templateUrl: './person-detail.component.html',
    styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
    pageTitle = 'Contact Detail';
    person: IPerson;
    errorMessage: string;

    constructor(private personService: PersonService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            this.getProduct(id);
        }
    }

    getProduct(id: number) {
        this.personService.getPerson(id).subscribe({
            next: person => this.person = person,
          error: err => this.errorMessage = err
        });
    }

    onBack(): void {
        this.router.navigate(['/persons']);
    }
}
