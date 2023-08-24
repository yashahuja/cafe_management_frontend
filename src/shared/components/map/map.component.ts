import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MapService } from './map.service';
import { HttpClient } from '@angular/common/http';
import { SimpleSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  realTimeValues: any;
  @Input() dataList = [];

  constructor(private mapService: MapService, private http: HttpClient){}
  ngOnInit() {
    // this.getAllMarkers()
    // this.mapMarkers(this.dataList);
  }

  ngOnChanges(change: SimpleChanges){
    this.dataList = change['dataList'] ? change['dataList'].currentValue : this.dataList;
    this.mapMarkers(this.dataList);
  }

  
  currLat: any;
  currLong: any;

  ngOnDestroy() {
  }

  ngAfterViewInit() {
    setTimeout(()=>console.log( this.initMap()),50);   
  }

  private initMap() {
    this.mapService.initializeMap();
  }

  private mapMarkers(list: any = []){
    for(let item of list){
      this.mapService.addMarker(item);
    }
  }

  // private getAllMarkers(){
  //   this.mapService.getAllMarkers('getAllAirQualityData');
  // }

}
