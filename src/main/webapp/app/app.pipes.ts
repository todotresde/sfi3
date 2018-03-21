import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'smallUUID'})
export class SmallUUID implements PipeTransform {
  transform(uuid: string): string {
    const lastPart = uuid.split('-').pop();
    return lastPart;
  }
}
