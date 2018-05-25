import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the SearchResultItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-result-item',
  templateUrl: 'search-result-item.html'
})
export class SearchResultItemComponent {
  
  @Input() item: TvMaze.Show;
  @Output() clickedResult: EventEmitter<TvMaze.Schedule> = new EventEmitter();

  constructor() {
  }

}
