import { NgModule } from '@angular/core';
import { EpisodeItemComponent } from './episode-item/episode-item';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultItemComponent } from './search-result-item/search-result-item';
import { CountdownComponent } from './countdown/countdown';
@NgModule({
	declarations: [EpisodeItemComponent,
    SearchResultItemComponent,
    CountdownComponent],
	imports: [
		IonicPageModule.forChild({})
	],
	exports: [EpisodeItemComponent,
    SearchResultItemComponent,
    CountdownComponent]
})
export class ComponentsModule {}
