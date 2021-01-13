import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonParameterService {
  showImage: boolean;
  filterBy: string;

  constructor() { }

}
