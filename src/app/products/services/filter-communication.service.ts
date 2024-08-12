import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Filter} from "../models/Filter";
import {IProduct} from "../models/IProduct";

interface FilterFunction {
  (products: IProduct[]): IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class FilterCommunicationService {

  private filtersSubject: Subject<FilterFunction> = new Subject<FilterFunction>();
  private filters: Filter[] = [];

  public registerFilter(filter: Filter): void {
    this.filters.push(filter);
  }

  public emitFilterChange(): void {
    this.filtersSubject.next((products: IProduct[]): IProduct[] => {
      return products.filter((product: IProduct) => {
        return this.filters.every((filter: Filter) => filter.applyFilter(product));
      });
    });
  }

  public onFilterChange(): Observable<FilterFunction> {
    return this.filtersSubject.asObservable();
  }

}
