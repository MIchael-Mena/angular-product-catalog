import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {
  transform(price: number): string {
    const formattedPrice = price.toLocaleString('es-AR');
    return `$ ${formattedPrice}`;
  }
}
