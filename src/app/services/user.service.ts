import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firstName = signal('Sarah');
  lastName = signal('Jenkins');
  role = signal('Chief Medical Officer');
  email = signal('sarah.jenkins@telemed.com');

  updateProfile(firstName: string, lastName: string, email: string) {
    this.firstName.set(firstName);
    this.lastName.set(lastName);
    this.email.set(email);
  }
}
