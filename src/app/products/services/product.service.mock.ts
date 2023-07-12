import {IProduct} from "../models/IProduct";
import {Observable, of} from "rxjs";
import {environment} from "../../../enviroments/environment";

export const mockProducts: IProduct[] = [
  {
    id_producto: 1912,
    id_subcategoria: 2,
    nombre: 'Mouse Logitech M100 Negro USB',
    subcategoria: "",
    imagenes: [
      {
        nombre: '9291_Mouse_Logitech_M100_Negro_USB_4dc57579',
        id_producto_imagen: 0,
        orden: 0,
        url: environment.baseURLImgProducts + 'Mouse Logitech M100 Negro USB' + '-med.jpg'
      }
    ],
    destacado: 0,
    precio: 2140,
    vendible: 1,
    stock: 5,
    garantia: 6,
    iva: 10.5
  }
]

export const productsResponseJson = [
  {
    "destacado": 0,
    "nombre": "Mouse Logitech M100 Negro USB",
    "id_producto": 1912,
    "id_subcategoria": 2,
    "precio": 2140,
    "imagenes": [
      {
        "nombre": "9291_Mouse_Logitech_M100_Negro_USB_4dc57579",
        "id_producto_imagen": 0,
        "orden": 0
      }
    ],
    "vendible": 1,
    "stock": 5,
    "garantia": 6,
    "iva": 10.5
  }
]

export class ProductServiceMock {

  get getProducts(): Observable<IProduct[]> {
    return of(mockProducts)
  }

}
