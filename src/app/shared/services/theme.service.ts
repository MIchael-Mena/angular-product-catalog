import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _isDarkTheme: boolean = false;
  private _darkTheme = new BehaviorSubject<boolean>(this._isDarkTheme);

  public changeTheme() {
    this._isDarkTheme = !this._isDarkTheme;
    if (this._isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    this._darkTheme.next(this._isDarkTheme);
  }

  get isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  get onToggleTheme(): Observable<boolean> {
    return this._darkTheme.asObservable()
  }

}
