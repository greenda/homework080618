import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagesService } from './common/services/pages.service';
import { PageCardComponent } from './page-card/page-card.component';
import {HttpClientModule} from '@angular/common/http';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    PagesService,
    {provide: 'pageServiceUrl', useValue: environment.pageServiceUrl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
