import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  BASE_API = 'https://api.first.org/data/v1/countries';
  countries = [];
  constructor(private myClient: HttpClient) {}
  GetAllCountries() {
    this.myClient.get(this.BASE_API).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
