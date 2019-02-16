import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';

import { DataService } from './shared/services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { CachingService } from './shared/services/caching-services';
import { CartService } from './shared/services/cart.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule
  ],
  providers: [DataService, CachingService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
