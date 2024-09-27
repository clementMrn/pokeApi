import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measurement'
})
export class MeasurementPipe implements PipeTransform {

  transform(value: number | undefined, type: string): string {
    console.log(`pour ${value} le type est ${type}`)
    if (value === undefined) {
      return '';
    }

    if (type === 'height') {
      const meters = value * 0.1;
      const inchesTotal = meters * 39.3701;
      const feet = Math.floor(inchesTotal / 12);
      const inches = (inchesTotal % 12).toFixed(1);
      const cm = (value * 0.1).toFixed(2);

      return `${feet}'${inches}" (${cm} cm)`;

    } else {
      const lbs = ((value * 0.1) / 0.453592).toFixed(1);
      const kg = (value * 0.1).toFixed(1);
      return `${lbs} lbs (${kg} kg)`;

    }
  }
}
