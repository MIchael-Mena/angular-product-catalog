import {Injectable} from '@angular/core';
import {StorageSessionService} from "./storage-session.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_STATUS_KEY = 'isLoggedIn';
  private behaviorSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private storageService: StorageSessionService) {
  }

  public onToggleLogin(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public login(email: string, password: string): boolean {
    const storedUser = this.storageService.getUser;
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      sessionStorage.setItem(this.LOGIN_STATUS_KEY, 'true');
      this.behaviorSubject.next(true);
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.storageService.deleteUser();
    sessionStorage.removeItem(this.LOGIN_STATUS_KEY);
    this.behaviorSubject.next(false);
  }

  public isAuthenticated(): boolean {
    const isLoggedIn = sessionStorage.getItem(this.LOGIN_STATUS_KEY);
    return isLoggedIn === 'true';
  }
}
