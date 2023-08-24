import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Chart, registerables} from 'node_modules/chart.js';
import { Observable, map, startWith } from 'rxjs';
import { InfoService } from './info.service';
import { DatePipe } from '@angular/common';
import { AqiParameter} from './info.data'
import { AppSettings } from '../app.settings';
Chart.register(...registerables)

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit{

  startDate: any;
  endDate: any;
  featureType: any;
  latLongList: any[] = [];
  constructor(private infoService: InfoService, private datePipe: DatePipe){}

  myControl = new FormControl<string>('');
  // options: any[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  selectedCoords: any;
  filteredOptions: Observable<any[]> | undefined;

  
  ngOnInit() {
  this.loadChart();
  this.prepareLatLongList();
    
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map((value: any) => {
      const lat = typeof value === 'string' ? value : value?.lat;
      const lon = typeof value === 'string' ? value : value?.lon;

      return (lat && lon) ? this._filter({lat: lat, lon: lon}) : this.latLongList.slice();
    }),
  );
  }

  public prepareLatLongList(){
    this.infoService.getData(AppSettings.GetUniqueCoordinates).subscribe((res: any)=>{
      if(res && res.dataList){
        this.latLongList = res.dataList;
      }else{
        this.latLongList = [];
      }
    });
  }
  
  
  public loadChart(xAxis: any = [], chartData: any = [], label: string = ''){
    new Chart('chart', {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: label,
          data: chartData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  displayFn(coords: any): string {
    return coords && coords.lat && coords.lon ? coords : '';
  }

  private _filter(coords: any): any[] {
    const lat = coords.lat;
    const lon = coords.lon;
    return this.latLongList.filter(item => (item.lat && item.lat.toString().includes(lat) || item.lon && item.lon.toString().includes(lon)));
  }

  public createChart(){
    const sdate = (this.datePipe.transform(this.startDate, 'MM/dd/yyyy'));
    const edate = (this.datePipe.transform(this.endDate, 'MM/dd/yyyy'));
    
    const coords = this.selectedCoords.toString().split(',');
    const lat = coords[0].trim().split(' ')[1];
    const lon = coords[1].trim().split(' ')[1];
    // const datesList = this.getDateList(this.datePipe.transform(this.startDate, 'YYYY/MM/dd'), this.datePipe.transform(this.endDate, 'YYYY/MM/dd'))
    // this.loadChart(datesList, null);
    this.infoService.getData(AppSettings.GetChartValues, {
      lat: lat,
      lon: lon,
      fromDate: sdate,
      toDate: edate
    }).subscribe((res: any)=>{
      var chartExist = Chart.getChart("chart");
      chartExist?.destroy()
      let chartData;
      let chartLabel;
      if(this.featureType == AqiParameter.Aqi){
        chartData=  res.map((item: any) => item.aqi);
        chartLabel = 'Aqi';
      }else if(this.featureType == AqiParameter.Co){
        chartData=  res.map((item: any) => item.co);
        chartLabel = 'Co';
      }else if(this.featureType == AqiParameter.No){
        chartData=  res.map((item: any) => item.no);
        chartLabel = 'No';
      }else if(this.featureType == AqiParameter.No2){
        chartData=  res.map((item: any) => item.no2);
        chartLabel = 'No2';
      }else if(this.featureType == AqiParameter.O3){
        chartData=  res.map((item: any) => item.o3);
        chartLabel = 'O3';
      }else if(this.featureType == AqiParameter.So2){
        chartData=  res.map((item: any) => item.so2);
        chartLabel = 'So2';
      }else if(this.featureType == AqiParameter.Pm2_5){
        chartData=  res.map((item: any) => item.pm2_5);
        chartLabel = 'Pm2_5';
      }else if(this.featureType == AqiParameter.Pm10){
        chartData=  res.map((item: any) => item.pm10);
        chartLabel = 'Pm10';
      }else if(this.featureType == AqiParameter.Nh3){
        chartData=  res.map((item: any) => item.nh3);
        chartLabel = 'Nh3';
      }
      const lables = res.map((item: any) => item.date+' '+item.time)
      this.loadChart(lables, chartData, chartLabel);
    })
  }

  // public getDateList(start: any, end: any){
  //        for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
  //         arr.push(this.datePipe.transform(new Date(dt), 'MM/dd/yyyy'));
  //     }
  //     return arr;
  // }
  
}
