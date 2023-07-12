import {Injectable} from '@angular/core';
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class StorageSessionService {

  constructor() {
  }

  public saveUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  get getUser(): any {
    const formData = sessionStorage.getItem('user');
    return formData ? JSON.parse(formData) : null;
  }

  public deleteUser(): void {
    sessionStorage.removeItem('user');
  }

}
