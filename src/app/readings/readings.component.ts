import { Component, OnInit } from '@angular/core';
import { ReadingService } from './reading.service';
import { MapService } from 'src/shared/components/map/map.service';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent implements OnInit {

  markersList: any;
  readingStatus: any;
  constructor(private readingService: ReadingService, private mapService: MapService){}

  ngOnInit(){
    this.readingStatus = "(all)";
    this.getAllMarkers();

  }

  public getAllMarkers(){
    this.markersList = [];
    const headerList = {
      "readingStatus": this.readingStatus,
    }
    this.readingService.getData(AppSettings.GetAllAirQualityData, headerList).subscribe((res: any)=>{
      this.markersList = res.data;
      // this.mapService.refreshMarkers('getAllAirQualityData');
    });
  }

  public flyOnMap(item: any){
    this.mapService.flyTo(item)
  }
}
