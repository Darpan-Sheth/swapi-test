import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpServiceService } from './providers/http-service.service';
import { SearchService } from './providers/search.service';
import { AppSettingsService } from './providers/app-settings.service';
import { HttpModule } from '../../node_modules/@angular/http';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './component/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpServiceService, 
              SearchService,
              AppSettingsService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
