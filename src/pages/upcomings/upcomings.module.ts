import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingsPage } from './upcomings';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UpcomingsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingsPage),
    ComponentsModule
  ],
})
export class UpcomingsPageModule {}
