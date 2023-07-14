import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService<T> {

  private dataSource: Subject<T> = new Subject();
  private data: Observable<T> = this.dataSource.asObservable();

  constructor() {
  }

  public updateData(data: T): void {
    console.log('updateData', data)
    this.dataSource.next(data);
  }

  get getData(): Observable<T> {
    return this.data;
  }

}
