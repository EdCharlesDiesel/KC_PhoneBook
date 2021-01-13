import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PersonEditComponent } from './person-edit.component';



@Injectable({
    providedIn: 'root'
})
export class PersonEditGuard implements CanDeactivate<PersonEditComponent> {

    canDeactivate(component: PersonEditComponent): boolean {
        if (component.isDirty) {
            const firstName = component.person.firstName || 'New Contact';
            return confirm(`Navigate away and lose all changes to ${firstName}?`);
        }
        return true;
    }
}
