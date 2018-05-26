import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MsToStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'msToString',
})
export class MsToStringPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return this.msToTime(value);
  }


  msToTime(duration: number) {
    let seconds: any = parseInt(((duration/1000)%60) as any), 
        minutes: any = parseInt(((duration/(1000*60))%60) as any), 
        hours: any = parseInt(((duration/(1000*60*60))%24) as any);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
}
