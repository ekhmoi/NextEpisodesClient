import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AVAILABLE_OVERLAY_CLASSES } from '../../constants';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EpisodeItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'episode-item',
  templateUrl: 'episode-item.html'
})
export class EpisodeItemComponent {
  private _item: TvMaze.Schedule;
  public overlayClass: string;

  @Output() clickedItem: EventEmitter<TvMaze.Schedule> = new EventEmitter();

  constructor(public api: ApiProvider) {

  }

  @Input() set item(item: TvMaze.Schedule) {
    this._item = item;
    this.overlayClass = this.getClassName();
  }

  get item(): TvMaze.Schedule {
    return this._item;
  }

  public get isSaved(): boolean {
    if (!this.item || !this.item.show) {
      return false;
    } else {
      return this.api.isFavorite(this.item.show.id);
    }
  }
  
  public toggleSaved(): void {
    if (this.isSaved) {
      this.api.removeFavorite(this.item.show.id)
    } else {
      this.api.addFavorite(this.item.show.id)
    }
  }

  public getClassName(): string {
    return AVAILABLE_OVERLAY_CLASSES[Math.floor(Math.random() * AVAILABLE_OVERLAY_CLASSES.length)];
  }
}
