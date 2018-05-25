import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverviewPage } from './overview';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    OverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OverviewPage),
    ComponentsModule
  ],
})
export class OverviewPageModule {}
