import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  public getData(url: string, headersList: any = null){
    const options = {headers: new HttpHeaders(headersList)};
    return this.http.get(url, options);
  }

  public saveData(url: string, body: any){
    return this.http.post(url, {body: body});
  }

}
