import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderComponentService {

  private behaviorSubject = new BehaviorSubject<boolean>(true);
  private loading: boolean = false;
  private componentsLoading: Map<string, boolean> = new Map<string, boolean>();

  constructor() {
  }

  public onToggleLoading(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public toggleLoad(statusLoading: boolean, component: string) {
    this.componentsLoading.set(component, statusLoading);
    this.checkStatusComponents();
    console.log(this.loading);
  }

  private checkStatusComponents(): void {
    const loading = Array.from(this.componentsLoading.values()).some(value => value);
    if (loading !== this.loading) {
      this.loading = loading;
      this.behaviorSubject.next(loading);
    }
  }

  public getComponentLoadingStatus(component: string): boolean {
    return this.componentsLoading.get(component) || false;
  }

}
