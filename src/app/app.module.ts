import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { LandDetailsComponent } from './components/land-details/land-details.component';
import { LandenComponent } from './components/landen/landen.component';
import { TopInwonersComponent } from './components/top-inwoners/top-inwoners.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandZoekComponent } from './components/land-zoek/land-zoek.component';

@NgModule({
  declarations: [
    AppComponent,
    LandenComponent,
    LandDetailsComponent,
    TopInwonersComponent,
    LandZoekComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule,
    HttpClientModule, InMemoryWebApiModule.forRoot(InMemoryDataService), FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
