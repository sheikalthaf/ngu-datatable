import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NguDataTableModule } from 'datatable';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NguDataTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
