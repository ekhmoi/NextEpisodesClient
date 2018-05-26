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
  private timeoutId: number;
  

  @Input() color: string = 'primary';
  @Input() set timeStamp(time: string) {
    this.timeString = time;
    this.setDifference();
    this.startCountDown();
  }

  get timeStamp(): string {
    return this._timeStamp as any;
  }

  private setDifference(): void {
    const now = new Date().getTime();
    const dest = new Date(this.timeString).getTime()
    this._timeStamp = dest - now;
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
}
