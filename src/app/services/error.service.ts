import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() { }

  notification(error: Error): any {
    console.log('Error', error);

    return error;
  }
}
