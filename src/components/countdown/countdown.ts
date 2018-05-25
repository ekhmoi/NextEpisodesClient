import { Component, Input, OnDestroy } from '@angular/core';
import { UPDATE_COUNTDOWN_TIME } from '../../constants';

/**
 * Generated class for the CountdownComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'countdown',
  templateUrl: 'countdown.html'
})
export class CountdownComponent implements OnDestroy {
  private timeString;
  private _timeStamp: number;
  private intervalId: number;
  private timeoutId: number;
  private text: string;
  

  @Input() color: string = 'primary';
  @Input() set timeStamp(time: string) {
    this.timeString = time;
    this.setDifference();
    this.startCountDown();
  }

  get timeStamp(): string {
    return this._timeStamp.toString();
  }

  private setDifference(): void {
    const now = new Date().getTime();
    const dest = new Date(this.timeString).getTime()
    this._timeStamp = dest - now;
    this.text = this.msToTime(this._timeStamp);
  }


  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private startCountDown(): void {
    this.timeoutId = window.setTimeout(() => {
      this.setDifference();
      this.startCountDown();
    }, UPDATE_COUNTDOWN_TIME);
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
