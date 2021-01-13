import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject, BehaviorSubject, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { IPerson } from './person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private appUrl = 'https://localhost:5001/api/persons';
    //appUrl = environment.appUrl;
    private persons: IPerson[];

    private selectedPersonSource = new BehaviorSubject<IPerson | null>(null);
    selectedPersonChanges$ = this.selectedPersonSource.asObservable();

    constructor(private http: HttpClient) { }

    changeSelectedPerson(selectedPerson: IPerson | null): void {
        this.selectedPersonSource.next(selectedPerson);
    }

    getPersons(): Observable<IPerson[]> {
        if (this.persons) {
            return of(this.persons);
        }
        return this.http.get<IPerson[]>(this.appUrl)
            .pipe(
                tap(data => console.log('All Conatcts', JSON.stringify(data))),
                tap(data => this.persons = data),
                catchError(this.handleError)
            );
    }

    getPerson(id: number): Observable<IPerson> {
        if (id === 0) {
            return of(this.initializePerson());
        }
        if (this.persons) {
            const foundItem = this.persons.find(item => item.id === id);
            if (foundItem) {
                return of(foundItem);
            }
        }
        const url = `${this.appUrl}/${id}`;
        return this.http.get<IPerson>(url)
            .pipe(
                tap(data => console.log('Single Contact: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    savePerson(person: IPerson): Observable<IPerson> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (person.id === 0) {
            return this.createPerson(person, headers);
        }
        return this.updatePerson(person, headers);
    }

    deletePerson(id: number): Observable<IPerson> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.appUrl}/${id}`;
        return this.http.delete<IPerson>(url, { headers })
            .pipe(
                tap(data => console.log('deletePperson: ' + id)),
                tap(data => {
                    const foundIndex = this.persons.findIndex(item => item.id === id);
                    if (foundIndex > -1) {
                        this.persons.splice(foundIndex, 1);
                        this.changeSelectedPerson(null);
                    }
                }),
                catchError(this.handleError)
            );
    }

    private createPerson(person: IPerson, headers: HttpHeaders): Observable<IPerson> {
        person.id = null;
        return this.http.post<IPerson>(this.appUrl, person, { headers })
            .pipe(
                tap(data => console.log('createPerson: ' + JSON.stringify(data))),
                tap(data => {                    
                    if (this.persons) {
                        this.persons.push(data);
                    }
                    this.changeSelectedPerson(data);
                }),
                catchError(this.handleError)
            );
    }

    private updatePerson(person: IPerson, headers: HttpHeaders): Observable<IPerson> {
        const url = `${this.appUrl}/${person.id}`;
        return this.http.put<IPerson>(url, person, { headers })
            .pipe(
                tap(data => console.log('updatePerson: ' + person.id)),
                catchError(this.handleError)
            );
    }

    private initializePerson(): IPerson {        
        return {
            id: 0,
            title: '',
            firstName: '',
            lastName: '',
            email:'',
            address:'',
            homeNumber: 0,
            workNumber:0                
        };
    }

    private handleError(err: HttpErrorResponse) {
        
        let errorMessage: string;
        if (err.error instanceof Error) {        
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {            
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}
