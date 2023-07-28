import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Filter} from "../models/Filter";
import {QueryParam} from "../models/QueryParam";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filtersSubject: Subject<Filter[]> = new Subject<Filter[]>();
  private queryParamSubject: Subject<QueryParam[]> = new Subject<QueryParam[]>();
  private queryParamToDeactivateSubject: Subject<QueryParam> = new Subject<QueryParam>();
  private filters: Filter[] = [];

  public registerFilter(filter: Filter): void {
    this.filters.push(filter);
  }

  get getParamsOfFiltersActivated(): Observable<QueryParam[]> {
    return this.queryParamSubject.asObservable();
  }

  get getFiltersActivated(): Observable<Filter[]> {
    return this.filtersSubject.asObservable();
  }

  get onDeactivateParam(): Observable<QueryParam> {
    return this.queryParamToDeactivateSubject.asObservable();
  }

  public deactivateFilterByParam(param: QueryParam): void {
    this.queryParamToDeactivateSubject.next(param);
  }

  public emitFilterChange(filter: Filter): void {
    const activatedFilters = this.filters.filter((f: Filter) => f.isActivated());
    const paramOptions = activatedFilters.map((filter: Filter) => filter.paramOption);
    this.filtersSubject.next(activatedFilters);
    this.queryParamSubject.next(paramOptions);
  }

}
