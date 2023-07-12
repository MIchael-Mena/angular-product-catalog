import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private dataSource = new BehaviorSubject(null);
  private data = this.dataSource.asObservable();

  constructor() {
  }

  public updateData(data: any): void {
    this.dataSource.next(data);
  }

  get getData(): Observable<any> {
    return this.data;
  }
  
}
