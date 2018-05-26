import { NgModule } from '@angular/core';
import { MsToStringPipe } from './ms-to-string/ms-to-string';
@NgModule({
	declarations: [MsToStringPipe],
	imports: [],
	exports: [MsToStringPipe]
})
export class PipesModule {}
