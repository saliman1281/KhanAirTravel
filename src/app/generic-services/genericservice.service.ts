import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const headersOpt = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Accept': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class GenericserviceService {
  baseUrl = "https://localhost:7271/api/";
  //baseUrl = "http://localhost/KASAPI/api/";
  constructor(private http: HttpClient) { }

  GenericServiceGetMethod(url: string, data: any) {
    return this.http.get(this.baseUrl + url, headersOpt).pipe(map((res) => {
      return res;
    }),
      catchError(e => {
        return throwError(e)
      })
    );
  }

  GenericServicePostMethod(url: string, data: any) {
    return this.http.post(this.baseUrl + url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
      })
    }).pipe(map((res) => {
      return res;
    }),
      catchError(e => {
        return throwError(e)
      })
    );
  }

}


