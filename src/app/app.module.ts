import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FabComponent} from "./components/fab/fab.component";
import {PokeIdPipe} from "./Pipe/pokeId.pipe";
import {FormsModule} from "@angular/forms";
import { PokeDetailsComponent } from './components/poke-details/poke-details.component';
import { MeasurementPipe } from './Pipe/measurement.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseStatePipe } from './Pipe/base-state.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokedexComponent,
    FabComponent,
    PokeIdPipe,
    PokeDetailsComponent,
    MeasurementPipe,
    BaseStatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
