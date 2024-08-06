import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Filter} from "../models/Filter";
import {ParamOption} from "../models/ParamOption";

@Injectable({
  providedIn: 'root'
})
export class FilterCommunicationService {

  private filtersSubject: Subject<Filter[]> = new Subject<Filter[]>();
  private queryParamSubject: Subject<ParamOption[]> = new Subject<ParamOption[]>();
  private urlParamsSubject: Subject<ParamOption[]> = new Subject<ParamOption[]>();
  private queryParamToDeactivateSubject: Subject<ParamOption> = new Subject<ParamOption>();
  private filters: Filter[] = [];

  public registerFilter(filter: Filter): void {
    this.filters.push(filter);
  }

  public removeParam(paramOption: ParamOption[]): void {
    this.urlParamsSubject.next(paramOption);
  }

  get onRemoveParam(): Observable<ParamOption[]> {
    return this.urlParamsSubject.asObservable();
  }

  get getParamsOfFiltersActivated(): Observable<ParamOption[]> {
    return this.queryParamSubject.asObservable();
  }

  get getFiltersActivated(): Observable<Filter[]> {
    return this.filtersSubject.asObservable();
  }

  get onDeactivateParam(): Observable<ParamOption> {
    return this.queryParamToDeactivateSubject.asObservable();
  }

  public deactivateFilterByParam(param: ParamOption): void {
    this.queryParamToDeactivateSubject.next(param);
  }

  public emitFilterChange(filter: Filter): void {
    const activatedFilters = this.filters.filter((f: Filter) => f.isActivated());
    const paramOptions = activatedFilters.map((filter: Filter) => filter.paramOption);
    this.filtersSubject.next(activatedFilters);
    this.queryParamSubject.next(paramOptions);
  }

}
