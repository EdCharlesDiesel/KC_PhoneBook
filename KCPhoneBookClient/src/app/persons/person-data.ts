import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IPerson } from './person';

export class PersonData implements InMemoryDbService {

    createDb() {
        const persons: IPerson[] = [
            {
                id: 1,   
                title: 'Mr',
                firstName: 'Charles',
                lastName: 'Mokhethi',
                email:'user@zxczx.com',
                address:'home avenue',
                homeNumber: 1233,
                workNumber:12365478
            },
            {
                id: 2, 
                title: 'Mr',
                firstName: 'Kagiso',
                lastName: 'Mokhethi',
                email:'user@zxczx.com',
                address:'home avenue',
                homeNumber: 1233,
                workNumber:12365478
            },
            {
                id: 5,
                title: 'Mrs',
                firstName: 'Naledi',
                lastName: 'Mokhethi',
                email:'user@zxczx.com',
                address:'home avenue',
                homeNumber: 1233,
                workNumber:12365478
            },
            {
                id: 8,
                title: 'Mr',
                firstName: 'Itumeleng',
                lastName: 'Mokoena',
                email:'user@zxczx.com',
                address:'home avenue',
                homeNumber: 1233,
                workNumber:12365478
            },
            {
                id: 10,
                title: 'Mr',
                firstName: 'Otsile',
                lastName: 'Botlhoko',
                email:'user@zxczx.com',
                address:'home avenue',
                homeNumber: 1233,
                workNumber:12365478
            }
        ];
        return { persons };
    }
}
