import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryUrl = 'https://countriesnow.space/api/v0.1/countries/positions';
  private stateUrl = 'https://countriesnow.space/api/v0.1/countries/states';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(this.countryUrl);
  }

  getStates(countryName: string): Observable<any> {
    return this.http.post(this.stateUrl, { country: countryName });
  }
}
