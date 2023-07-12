export interface IProduct {
  id_producto: number;
  id_subcategoria: number;
  nombre: string;
  subcategoria?: string;
  imagenes: IImage[];
  destacado: number;
  precio: number;
  vendible: number;
  stock: number;
  garantia: number;
  iva: number;
}

export interface IImage {
  id_producto_imagen: number;
  nombre: string;
  orden: number;
  url?: string;
}
