import { Component, OnDestroy, OnInit } from '@angular/core';
import { Utility } from 'src/shared/utilities/utility';
import { DatePipe } from '@angular/common';
import { HomeService } from './home.service';
import { HttpHeaders } from '@angular/common/http';
import { MapService } from 'src/shared/components/map/map.service';
import { EventService } from 'src/shared/services/event/event.service';
import { InputWay } from './home.data'
import { AuthService } from 'src/shared/services/auth/auth.service';
import { AppSettings } from '../app.settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private datePipe: DatePipe, private homeService: HomeService, private mapService: MapService,
    private eventService: EventService){}
  ngOnDestroy() {
    this.userRole = '';
    AuthService.role.next('');
  }

  user:any = {}
  currLong: any;
  currLat: any;
  currDate:any
  currTime:any
  markersList: any;
  realTimeValues: any
  parametersList: any[] = [];
  userRole: any;
  inputWay: any;

  ngOnInit() {
    this.getAllMarkers();
    this.inputWay = InputWay.Manually.toString();
    this.user.firstName = '';
    this.user.pasword = '';
    this.currDate =this.datePipe.transform((new Date), 'MM/dd/yyyy');
    this.currTime =this.datePipe.transform((new Date), 'HH:mm:ss');
    this.parametersList.push({name: 'AQI', value: ''});
    this.parametersList.push({name: 'CO', value: ''});
    this.parametersList.push({name: 'NO', value: ''});
    this.parametersList.push({name: 'NO2', value: ''});
    this.parametersList.push({name: 'O3', value: ''});
    this.parametersList.push({name: 'SO2', value: ''});
    this.parametersList.push({name: 'PM2_5', value: ''});
    this.parametersList.push({name: 'PM10', value: ''});
    this.parametersList.push({name: 'NH3', value: ''});
    this.getUserRole();
    }

  getUserRole() {
    // setTimeout(() => {
      AuthService.role.subscribe((role: string)=>{
        this.userRole = role;
        if(this.userRole == 'viewer') {
          this.getCurrentLocationCoordinates();
        }
      })
      // this.userRole = localStorage.getItem('role');
     
    // }, 1000);
  }

    
   public getCurrentLocationCoordinates(){
    this.currLat = 0;
    this.currLong = 0;
    if(!navigator.geolocation){
        console.log("please allow location access");
      }else{
        navigator.geolocation.getCurrentPosition((pos)=>{
          this.currLat  =  pos.coords.latitude;
          this.currLong  = pos.coords.longitude;
        }, err=>{
            console.log(err);
          });
      }
   }

   public goToYourCoordinates() {
    if (this.userRole != 'contributer') {
      const headerList = {'lat': this.currLat, 'lon': this.currLong};
      this.homeService.getData(AppSettings.SearchAqiData, headerList).subscribe((res:any)=>{
        const obj = res;
        if(obj && obj.data) {
          this.mapService.flyTo(obj.data);
        } else {
          this.eventService.showSuccessMessage(res.message);
          setTimeout(() => {
            this.eventService.showSuccessMessage('Flying to your coordinates.')
            this.mapService.flyTo(headerList, false);
          }, 1500);
        }
      });
    }
   }
   public broadCastAqValues(event: any){
    event.preventDefault();
    const headerList = {
      'lat': this.currLat,
      'long': this.currLong
    }
      this.homeService.getData(AppSettings.GetAirQualityData, headerList).subscribe((res: any)=>{
        if(res && res.list){
          this.parametersList[0].value = res.list[0].main.aqi;
          this.parametersList[1].value = res.list[0].components.co;
          this.parametersList[2].value = res.list[0].components.no;
          this.parametersList[3].value = res.list[0].components.no2;
          this.parametersList[4].value = res.list[0].components.o3;
          this.parametersList[5].value = res.list[0].components.so2;
          this.parametersList[6].value = res.list[0].components.pm2_5;
          this.parametersList[7].value = res.list[0].components.pm10;
          this.parametersList[8].value = res.list[0].components.nh3;
        }
      });
   }
   public saveAndVisualize(){
    // this.realTimeValues.date = this.currDate;
    // this.realTimeValues.time = this.currTime;
    if (!this.parametersList[0].value) {
      return;
    }
    const obj = {
      date: this.currDate,
      time: this.currTime,
      lat: this.currLat,
      lon: this.currLong,
      aqi: this.parametersList[0].value,
      co: this.parametersList[1].value,
      no: this.parametersList[2].value,
      no2: this.parametersList[3].value,
      o3: this.parametersList[4].value,
      so2: this.parametersList[5].value,
      pm2_5: this.parametersList[6].value,
      pm10: this.parametersList[7].value,
      nh3: this.parametersList[8].value,
    }
    this.homeService.saveData(AppSettings.SaveAirQualityData, obj).subscribe((res: any)=>{
      if (res && res.errorCode === 200) {
        this.getAllMarkers();
        this.mapService.flyTo(obj);
      } 
      this.eventService.showSuccessMessage(res.message);
      console.log(res.message);
      // this.mapService.refreshMarkers();
    });
   }

    public getAllMarkers(){
      this.homeService.getData(AppSettings.GetLatestAirQualityReadings).subscribe((res: any)=>{
        this.markersList = res.data;
        // this.mapService.refreshMarkers('getAllAirQualityData');
      });
    }
}
