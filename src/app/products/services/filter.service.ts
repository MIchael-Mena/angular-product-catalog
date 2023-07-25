import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Filter} from "../models/Filter";
import {QueryParam} from "../models/QueryParam";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filtersSubject: Subject<Filter[]> = new Subject<Filter[]>();
  private paramsSubject: Subject<QueryParam[]> = new Subject<QueryParam[]>();
  private filters: Filter[] = [];
  private activeFilterParameters: QueryParam[] = [];

  public addFilter(filter: Filter): void {
    this.filters.push(filter);
    if (filter.isActivated()) {
      this.activeFilterParameters.push(filter.paramOption);
    }
    this.filtersSubject.next(this.filters);
  }

  get filtersActivated(): Observable<QueryParam[]> {
    return this.paramsSubject.asObservable();
  }

}
