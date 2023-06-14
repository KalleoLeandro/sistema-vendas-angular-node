import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number): string {
    const formattedValue = value.toFixed(2).replace('.', ',');
    return `R$ ${formattedValue}`;
  }
}
