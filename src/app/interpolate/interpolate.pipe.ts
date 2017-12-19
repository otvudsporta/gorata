import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interpolate'
})
export class InterpolatePipe implements PipeTransform {
  transform(templateText: string, values: Record<string, any>) {
    return Object.keys(values).reduce((interpolatedText, key) => {
      const value = values[key] != null ? values[key].toString() : '';
      return interpolatedText.replace(new RegExp(`\{\{${key}\}\}`, 'g'), value);
    }, templateText || '');
  }
}
