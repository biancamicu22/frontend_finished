import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { CazareComponent } from './cazare/cazare.component';
import { EditAlbumModalComponent } from './edit/edit-album-modal/edit-album-modal.component';
import { EditArtistModalComponent } from './edit/edit-artist-modal/edit-artist-modal.component';
import { EditSongModalComponent } from './edit/edit-song-modal/edit-song-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { SearchPipe } from './shared/search.pipe';
import { DetailModalComponent } from './cazare/detail-modal/detail-modal.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CartModalComponent } from './header/cart-modal/cart-modal.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { MatNativeDateModule } from '@angular/material/core';
import { ChooseVacationModalComponent } from './header/cart-modal/choose-vacation-modal/choose-vacation-modal.component';
import { AtractieComponent } from './atractie/atractie.component';
import { DetailAtractieModalComponent } from './atractie/detail-atractie-modal/detail-atractie-modal.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DetailRestaurantModalComponent } from './restaurant/detail-restaurant-modal/detail-restaurant-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { AddVacantaModalComponent } from './home/add-vacanta-modal/add-vacanta-modal.component';
import { FavouritesModalComponent } from './header/favourites-modal/favourites-modal.component';
import { EditCazareModalComponent } from './edit/edit-cazare-modal/edit-cazare-modal.component';
import { EditAtractieModalComponent } from './edit/edit-atractie-modal/edit-atractie-modal.component';
import { EditRestaurantModalComponent } from './edit/edit-restaurant-modal/edit-restaurant-modal.component';
import { ContactComponent } from './contact/contact.component';
import { UserService } from './services/user.service';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    CazareComponent,
    EditComponent,
    EditAlbumModalComponent,
    EditArtistModalComponent,
    EditSongModalComponent,
    HomeComponent,
    SearchPipe,
    DetailModalComponent,
    HeaderComponent,
    CartModalComponent,
    ChooseVacationModalComponent,
    AtractieComponent,
    DetailAtractieModalComponent,
    RestaurantComponent,
    DetailRestaurantModalComponent,
    LoginComponent,
    AddVacantaModalComponent,
    FavouritesModalComponent,
    EditCazareModalComponent,
    EditAtractieModalComponent,
    EditRestaurantModalComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    JwtModule.forRoot({
      config:{
        disallowedRoutes: []
      }
    })
  ],
  exports: [],
  entryComponents: [],
  bootstrap: [AppComponent],
  providers: [
    UserService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill'}},
  ]
})
export class AppModule { }
