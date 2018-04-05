import { Pipe, PipeTransform } from '@angular/core';
import * as SYSTEM from './shared/constants/system.constants';

@Pipe({name: 'smallUUID'})
export class SmallUUID implements PipeTransform {
  transform(uuid: string): string {
    const lastPart = uuid.split('-').pop();
    return lastPart;
  }
}

@Pipe({name: 'status'})
export class Status implements PipeTransform {
  transform(status: number): string {
   switch (status) {
      case SYSTEM.STATUS_CREATED : return 'Created';
      case SYSTEM.STATUS_STARTED : return 'Started';
      case SYSTEM.STATUS_FINISHED : return 'Finished';
      case SYSTEM.STATUS_CANCELED : return 'Canceled';
      default : return 'Unknown';
   }
  }
}

@Pipe({name: 'sort'})
export class Sort implements PipeTransform {
  transform(array: Array<any>, args: Array<string>): Array<any> {
    if (array) {
          array.sort((a: any, b: any) => {
              let valueA = '';
              let valueB = '';
              args.forEach((field) => {
                  valueA += (field.indexOf('.') !== -1) ? a[field.split('.')[0]][field.split('.')[1]] : a[field];
                  valueB += (field.indexOf('.') !== -1) ? b[field.split('.')[0]][field.split('.')[1]] : b[field];
              });

              if (valueA < valueB) {
                  return -1;
              } else if (valueA > valueB) {
                  return 1;
              } else {
                  return 0;
              }
          });
      }
      return array;
  }
}
