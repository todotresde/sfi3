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
