  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Artist } from './artist.model';
  import { Song } from './song.model';
  import { Album } from './album.model';
  import { Fotografie } from './fotografie.model';
  import { Utilizator } from './utilizator.model';
  import { Vacanta } from './vacanta.model';
  import { Facilitate } from './facilitate.model';
  import { Atractie } from './atractie.model';
  import { Restaurant } from './restaurant.model';
  import { Mancare } from './mancare.model';
  import { Meniu } from './meniu.model';
  import { Rezervare } from './rezervare.model';
import { Observable } from 'rxjs';
import { CazareRezervare } from './cazare-rezervare.model';
import { VacantaRezervare } from './vacantaRezervare.model';



  @Injectable({
    providedIn: 'root'
  })
  export class ApiService {
    
    constructor(private http: HttpClient) {}

    header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    baseUrl = 'https://localhost:44335';

   
    addSong(song: Song) {
      return this.http.post(this.baseUrl + '/song', song, { headers: this.header });
    }

    addArtist(artist: Artist) {
      return this.http.post(this.baseUrl + '/artist', artist, { headers: this.header });
    }

    addAlbum(album) {
      return this.http.post(this.baseUrl + '/album', {
        'name': album.name,
        'releaseYear': album.releaseYear,
        'price': album.price,
        'studioId': album.studioId,
        'ArtistId': JSON.parse('[' + album.artistId + ']'),
        'SongId': JSON.parse('[' + album.songId + ']'),
        'img': album.img
      }, { headers: this.header });
    }

    addFotografie(foto: Fotografie) {
      return this.http.post(this.baseUrl + '/fotografie', {
        'titlu': foto.titlu,
        'data': foto.data,
      }, {headers: this.header });
    }

    addRezervare(rez: Rezervare) {
      return this.http.post(this.baseUrl + '/rezervare', {
        'utilizator': rez.utilizatorID,
        'vacanta': rez.vacantaID,
        'dataRezervare': rez.dataRezervare,
        'rating': rez.rating,
        'review': rez.review
      }, {headers: this.header });
    }

    addVacanta(vacanta) {
      return this.http.post(this.baseUrl + '/vacanta', {
        'denumire': vacanta.denumire,
        'dataInceput': vacanta.dataInceput,
        'dataSfarsit': vacanta.dataSfarsit,
        'oras': vacanta.oras,
        'tara': vacanta.tara
      }, {headers: this.header });
    }

    addRezervareCazare(rezervCazare) {
      var sos = new Date(rezervCazare.dataSosire);
      var sfar = new Date(rezervCazare.dataPlecare)
      return this.http.post(this.baseUrl + '/rezervareCazare', {
        'vacantaID': rezervCazare.vacantaID,
        'cazareID': rezervCazare.cazareID,
        'codRezervare': rezervCazare.codRezervare,
        'dataSosire': sos,
        'dataPlecare': sfar
      }, {headers: this.header });
    }
  


    addFacilitate(facilitate: Facilitate) {
      return this.http.post(this.baseUrl + '/facilitate', {
        'denumire': facilitate.denumire,
        'favicon': facilitate.favicon
      }, {headers: this.header});
    }

    addRestaurant(res: Restaurant) {
      return this.http.post(this.baseUrl + '/restaurant', {
        'nume': res.nume,
        'oraDeschidere': res.oraDeschidere,
        'oraInchidere': res.oraInchidere,
        'oras': res.oras,
        'adresa': res.adresa,
        'meniuID': JSON.parse('[' + res.meniuID + ']'),
        'listaImagini': res.listaImagini,
      }, {headers: this.header})
    }

    addMeniu(men: Meniu) {
      return this.http.post(this.baseUrl + '/meniu', {
        'restaurantID': men.restaurantID,
        'mancareID': men.mancareID,
        'pret': men.pret
      }, {headers: this.header})
    }

    addMancare(mancare: Mancare) {
      return this.http.post(this.baseUrl + '/mancare', {
        'denumire': mancare.denumire
      }, {headers: this.header})
    }

    addBilet(bil) {
      return this.http.post(this.baseUrl + '/bilet', {
        'vacantaID': bil.vacantaID,
        'atractieID': bil.atractieID,
        'codBilet': bil.codBilet,
        'dataVizita': bil.dataVizita
      }, {headers: this.header})
    }

    addTichetMasa(tm) {
      return this.http.post(this.baseUrl + '/tichetMasa', {
        'vacantaID': tm.vacantaID,
        'restaurantID': tm.restaurantID,
        'codTichet': tm.codTichet,
        'dataVizita': tm.dataVizita
      }, {headers: this.header})
    }

    getAlbum(id: number) {
      return this.http.get(this.baseUrl + '/album/' + id.toString(), { headers: this.header });
    }

    getSong(id: number) {
      return this.http.get(this.baseUrl + '/song/' + id.toString(), { headers: this.header });
    }

    getArtist(id: number) {
      return this.http.get(this.baseUrl + '/artist/' + id.toString(), { headers: this.header });
    }

    getStudio(id: number) {
      return this.http.get(this.baseUrl + '/studio/' + id.toString(), { headers: this.header });
    }

    getUtilizator(id: number) {
      return this.http.get(this.baseUrl + '/utilizator/' + id.toString(), { headers: this.header });
    }

    getRezervare(id: number) {
      return this.http.get(this.baseUrl + '/rezervare/' + id.toString(), { headers: this.header });
    }

    getFotografie(id: number) {
      return this.http.get(this.baseUrl + '/fotografie/' + id.toString(), { headers: this.header });
    }

    getVacanta(id: number) {
      return this.http.get(this.baseUrl + '/vacanta/Id?Id=' + id.toString(), { headers: this.header });
    }

  

    getMancare(id: number) {
      return this.http.get(this.baseUrl + '/mancare/' + id.toString(), {headers: this.header});
    }

    getRestaurant(id: number) {
      return this.http.get(this.baseUrl + '/restaurant/' + id.toString(), { headers: this.header });
    }

 

    getFacilitate(id: number) : Observable<Facilitate> {
      return this.http.get<Facilitate>(this.baseUrl + '/facilitate/Id?Id=' + id.toString(), {headers: this.header});
    }

    getFacilitateID(id: number) {
      return this.http.get(this.baseUrl + '/facilitate/facilitate/' + id.toString(), {headers: this.header});
    }

    getAlbums() {
      return this.http.get(this.baseUrl + '/album', { headers: this.header });
    }

    getSongs() {
      return this.http.get(this.baseUrl + '/song', { headers: this.header });
    }

    getArtists() {
      return this.http.get(this.baseUrl + '/artist', { headers: this.header });
    }

    getUtilizatori() {
      return this.http.get(this.baseUrl + '/utilizator', { headers: this.header });
    }

    getRezervari() {
      return this.http.get(this.baseUrl + '/rezervare', { headers: this.header });
    }

    getMancaruri() {
      return this.http.get(this.baseUrl + '/mancare', {headers: this.header});
    }

    getFotografii() {
      return this.http.get(this.baseUrl + '/fotografie', { headers: this.header });
    }

    getVacante() {
      return this.http.get(this.baseUrl + '/vacanta', { headers: this.header });
    }

    

    getRestaurante() {
      return this.http.get(this.baseUrl + '/restaurant', { headers: this.header });
    }

    getFacilitati() {
      return this.http.get(this.baseUrl + '/facilitate', { headers: this.header });
    }

    editUtilizator(user: Utilizator) {
      return this.http.put(this.baseUrl + '/utilizator/' + user.id.toString(), user, { headers: this.header });
    }

    editRezervare(rez: Rezervare) {
      return this.http.put(this.baseUrl + '/rezervare/' + rez.id.toString(), rez, { headers: this.header });
    }
    
    editFotografie(foto: Fotografie) {
      return this.http.put(this.baseUrl + '/fotografie/' + foto.id.toString(), foto, { headers: this.header });
    }

    editVacanta(vacanta: Vacanta) {
      return this.http.put(this.baseUrl + '/vacanta/' + vacanta.id.toString(), vacanta, { headers: this.header });
    }

    

    editRestaurant(rest: Restaurant) {
      return this.http.put(this.baseUrl + '/restaurant/' + rest.id.toString(), rest, { headers: this.header });
    }

    

    deleteAlbum(id: number) {
      return this.http.delete(this.baseUrl + '/album/' + id.toString(), { headers: this.header });
    }

    deleteSong(id: number) {
      return this.http.delete(this.baseUrl + '/song/' + id.toString(), { headers: this.header });
    }

    deleteArtist(id: number) {
      return this.http.delete(this.baseUrl + '/artist/' + id.toString(), { headers: this.header });
    }

    deleteUtilizator(id: number) {
      return this.http.delete(this.baseUrl + '/utilizator/' + id.toString(), { headers: this.header });
    }

    deleteRezervare(id: number) {
      return this.http.delete(this.baseUrl + '/rezervare/' + id.toString(), { headers: this.header });
    }
    
    deleteFotografie(id: number) {
      return this.http.delete(this.baseUrl + '/fotografie/' + id.toString(), { headers: this.header });
    }

    deleteVacanta(id: number) {
      return this.http.delete(this.baseUrl + '/vacanta/' + id.toString(), { headers: this.header });
    }

   

    deleteRestaurant(id: number) {
      return this.http.delete(this.baseUrl + '/restaurant/' + id.toString(), { headers: this.header });
    }



    editAlbum(album: Album) {

      return this.http.put(this.baseUrl + '/album/' + album.id.toString(), album, { headers: this.header });
    }

    editArtist(artist: Artist) {
      return this.http.put(this.baseUrl + '/artist/' + artist.id.toString(), artist, { headers: this.header });
    }

    editSong(song: Song) {
      return this.http.put(this.baseUrl + '/song/' + song.id.toString(), song, { headers: this.header });
    }
    
    getVacantaRezervare() : Observable<Array<VacantaRezervare>>{
      return this.http.get<Array<VacantaRezervare>>(this.baseUrl +"/vacanta/vacantaRezervare",{ headers: this.header })
    }


  }

