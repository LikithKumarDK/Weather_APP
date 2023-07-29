// my-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(city: string): Observable<any> {
    const url = `${this.apiUrl}/getWeatherInfo/city?city=${city}`;
    return this.http.get<any>(url);
  }
}
