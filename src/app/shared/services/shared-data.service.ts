import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService<T> {

  private dataSource: BehaviorSubject<T> = new BehaviorSubject({} as T);

  constructor() {
  }

  public updateData(data: T): void {
    this.dataSource.next(data);
  }

  get getData(): Observable<T> {
    return this.dataSource.asObservable();
  }

}
