import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment";
import {Observable} from "rxjs";
import {ISubcategory} from "../models/ISubcategory";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiUrl: string = environment.baseURL + '/test/subcategorias.json';

  constructor(private http: HttpClient) {
  }

  get subcategories(): Observable<ISubcategory[]> {
    return this.http.get<ISubcategory[]>(this.apiUrl);
  }

}
