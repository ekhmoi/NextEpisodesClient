import { NgModule } from '@angular/core';
import { EpisodeItemComponent } from './episode-item/episode-item';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultItemComponent } from './search-result-item/search-result-item';
import { CountdownComponent } from './countdown/countdown';
import { PipesModule } from '../pipes/pipes.module';
import { LoaderComponent } from './loader/loader';
@NgModule({
	declarations: [EpisodeItemComponent,
    SearchResultItemComponent,
    CountdownComponent,
    LoaderComponent],
	imports: [
		IonicPageModule.forChild({}),
		PipesModule
	],
	exports: [EpisodeItemComponent,
    SearchResultItemComponent,
    CountdownComponent,
    LoaderComponent]
})
export class ComponentsModule {}
