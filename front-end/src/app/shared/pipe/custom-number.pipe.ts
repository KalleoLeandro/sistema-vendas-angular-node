import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber'
})
export class CustomNumberPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number): string {
    //const formattedValue = value.toFixed(2).replace('.', ',');
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    //return formattedValue;
    return `${formattedValue}`;
    
  }
  
}
