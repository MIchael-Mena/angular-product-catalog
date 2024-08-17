import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Filter} from "../models/Filter";
import {IProduct} from "../models/IProduct";
import {ParamOption} from "../models/ParamOption";

interface FilterFunction {
  (products: IProduct[]): IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class FilterCommunicationService {

  private filtersSubject: Subject<FilterFunction> = new Subject<FilterFunction>();
  // private currentQueryParams: Map<string, string> = new Map<string, string>();
  private currentQueryParams: { [key: string]: string } = {};
  // TODO: importantes el backend deberia hacer el filtrado de los productos y no el front
  // a futuro se deberia eliminar este array de filters y en su lugar emitir los valores del
  // queryparams para que el backend haga el filtrado
  private filters: Filter[] = [];

  public registerFilter(filter: Filter): void {
    this.filters.push(filter);
    // this.currentQueryParams.set(filter.paramOption.name, filter.paramOption.value);
    this.currentQueryParams[filter.paramOption.name] = filter.paramOption.value;
  }

  public emitFilterChange(newQueryParam: ParamOption): void {
    // this.currentQueryParams.set(newValue.name, newValue.value);
    this.currentQueryParams[newQueryParam.name] = newQueryParam.value;

    this.filtersSubject.next((products: IProduct[]): IProduct[] => {
      return products.filter((product: IProduct) => {
        return this.filters.every((filter: Filter) => filter.applyFilter(product));
      });
    });
  }

  public onFilterChange(): Observable<FilterFunction> {
    return this.filtersSubject.asObservable();
  }

  public getQueryParamValue(option: string): string {
    // return this.currentQueryParams.get(option) || '';
    return this.currentQueryParams[option] || '';
  }

  // Devuelve un objeto con los parámetros de la url
  // Ejemplo: Si la url es 'http://localhost:4200/products?priceRange=0-100&search=camisa'
  // Debería devolver {priceRange: '0-100', search: 'camisa'}
  get allQueryParams(): { [key: string]: string } {
    // const queryParams: { [key: string]: string } = {};
    // this.currentQueryParams.forEach((value, key) => {
    //   queryParams[key] = value;
    // });
    // return queryParams;
    return this.currentQueryParams;
  }

}
