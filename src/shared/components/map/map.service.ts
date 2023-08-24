import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: any;
  markersList: any[] = [];
  // icon = {
  //   icon: L.icon({
  //     iconSize: [25, 41],
  //     iconAnchor: [25, 41],
  //     iconUrl: 'assets/marker-icon-2x.png',
  //     shadowUrl: 'assets/marker-shadow.png',
  //   }),
  // };
  // icon_fresh = {
  //   icon: L.icon({
  //     iconSize: [51, 51],
  //     iconAnchor: [25, 41],
  //     iconUrl: './assets/icons/fresh.png',
  //     shadowUrl: 'assets/marker-shadow.png',
  //   }),
  // };
  // icon_moderate = {
  //   icon: L.icon({
  //     iconSize: [51, 51],
  //     iconAnchor: [25, 41],
  //     iconUrl: './assets/icons/moderate.png',
  //     shadowUrl: 'assets/marker-shadow.png',
  //   }),
  // };
  // icon_danger = {
  //   icon: L.icon({
  //     iconSize: [41, 41],
  //     iconAnchor: [25, 45],
  //     iconUrl: './assets/icons/danger.png',
  //     shadowUrl: 'assets/marker-shadow.png',
  //   }),
  // };

  constructor(private http: HttpClient) {}

  public getIconColor(item: any): any{
    switch(item.aqi){
      case 1: return '#99d35c'
      case 2: return '#15b45f'
      case 3: return '#318e5b'
      case 4: return '#fffa10'
      case 5: return '#ffc30f'
      case 6: return '#e4791e'
      case 7: return '#ff2d0e'
      case 8: return '#c7321e'
      case 9: return '#791a14'
      case 10: return '#7031a0'
    }
  }

  public initializeMap() {
    this.map = L.map('map').setView([53.449444, -7.503056], 7);
    const tiles = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    // L.contror().locate().addTo(this.map);
  }

  public getData(url: string, headersList: any = null) {
    const options = { headers: new HttpHeaders(headersList) };
    return this.http.get(url, options);
  }
  // public getIcon(item: any): any{
  //   if(item.aqi<=3){
  //     return this.icon_fresh;
  //   }else if(item.aqi<=6){
  //     return this.icon_moderate;
  //   }else if(item.aqi<=9){
  //     return this.icon_danger
  //   }else if(item.aqi<=3){
  //     return this.icon
  //   }
  // }
  public addMarker(item: any) {
    let iconColor = this.getIconColor(item);
    let markerHtmlStyles = `
    background-color: ${iconColor};
    width: 3rem;
    height: 3rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`
  
    let icon2 = L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`
    })

    let marker = L.marker([item.lat, item.lon], {icon: icon2})
      .bindPopup(
        `<mat-card class="card">
            <mat-card-header>
              <mat-card-title><h1>Lat: ${item.lat}</h3></mat-card-title>
              <mat-card-title><h1>Lon: ${item.lon}</h3></mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h3>Date: ${item.date}</h3>
              <h3>Time: ${item.time}</h3>
              <h3>AQI: ${item.aqi}</h3>
              <h3>CO: ${item.co}</h3>
              <h3>NO: ${item.no}</h3>
              <h3>NO2: ${item.no2}</h3>
              <h3>O3: ${item.o3}</h3>
              <h3>SO2: ${item.so2}</h3>
              <h3>PM2_5: ${item.pm2_5}</h3>
              <h3>PM10: ${item.pm10}</h3>
              <h3>NH3: ${item.nh3}</h3>
            </mat-card-content>
          </mat-card>`,
        { closeButton: false }
      )
      .addTo(this.map);
      return marker;
  }

  public flyTo(item: any, openPopup: boolean=true) {
    this.map.flyTo([item.lat, item.lon], 10, {
      duration: 2,
    });

    setTimeout(()=>{
      if(openPopup) {
        this.addMarker(item).openPopup();
      }
    },2000)
  }
  // public refreshMarkers(url: string){
  //   this.getData(url).subscribe((res: any)=>{
  //     this.markersList = res.data;
  //     this.mapMarkers();
  //   });
  // }

  // private mapMarkers(){
  //   for(let item of this.markersList){
  //     this.addMarker(item);
  //   }
  // }
}
