import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../enviroment/environment";
import {map, Observable} from "rxjs";
import {ISubcategory} from "../model/ISubcategory";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private apiUrl: string = environment.baseURL + '/test/subcategorias.json';
  private apiUrlImg: string = environment.baseURLImgSubcategories;

  constructor(private http: HttpClient) {
  }

  get getSubcategories(): Observable<ISubcategory[]> {
    return this.http.get<ISubcategory[]>(this.apiUrl).pipe(
      map((subcategories: ISubcategory[]) => {
        this.prepareSubcategories(subcategories);
        return subcategories;
      })
    );
  }

  private prepareSubcategories(subcategories: ISubcategory[]): void {
    subcategories.forEach((subcategory: ISubcategory) => {
      subcategory.nombre = subcategory.nombre.trim();
      subcategory.imageUrl = this.apiUrlImg + subcategory.imagen;
    });
  }


}
