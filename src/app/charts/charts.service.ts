import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  public getData(url: string, headersList: any = null) {
    const options = { headers: new HttpHeaders(headersList) };
    return this.http.get(url, options);
  }
}
