import { Injectable } from '@angular/core';
import { Societe } from 'src/app/models/societe';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/index";



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getInfosBySiren(siren : string) {
    const urlApi="https://api.insee.fr/entreprises/sirene/V3/siren/";
    //const urlApi="https://api.github.com/users/";
    //const urlApi="https://api.openweathermap.org/data/2.5/weather";
    // const headers = new HttpHeaders()
    // .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
    // .append('Access-Control-Allow-Origin', 'http://localhost:4200') 
    // .append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    // .append('Access-Control-Allow-Credentials', 'true')
    // .append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    const headers:  HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Allow-Credentials': 'true'
    });
    
    let params = new HttpParams().set('q', siren);
    //.get(urlApi +siren, { params: params })
    
    return this.http
    .get(urlApi +siren, {headers})
    //.get(urlApi, { params: params })
    .pipe(
      map(response => {
      console.log(response);
      })
    )
  }


}
