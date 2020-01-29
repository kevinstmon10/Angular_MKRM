import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/Sensor';
import { StationService } from '../../services/station.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../../models/Data';
import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting';
import HC_data from 'highcharts/modules/data';
import HC_ExpData from 'highcharts/modules/export-data';

HC_exporting(Highcharts);
HC_data(Highcharts);
HC_ExpData(Highcharts);

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css'],
  providers: [StationService, UserService]
})
export class RealtimeComponent implements OnInit {
  public title: String;
  public token;
  public identity;
  public sensor: Sensor;
  options: Object;
  public Data;
  public Datas: Data[];
  public minVal;
  public maxVal;
  public plotMinVal;
  public plotMaxVal;
  public ultimox;
  public ultimoy;

  chartOptions: Object;
  Highcharts = Highcharts;
  chartConstructor = 'chart'; /****Change to highchart(chart) to highstocks(stockChart) */
  updateFlag: boolean = true;
  chartCallback: any;
  chart: any;

  constructor(
    private _stationService: StationService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.sensor = new Sensor(1, "", "", "", "", "");
    this.chartCallback = chart => {
      this.chart = chart;
    };
  }


  ngOnInit() {
    this.getSensor();
    this.Chart();
  }




  onUpdate(form) {
    console.log(this.sensor);
    var id = this._route.snapshot.paramMap.get('id');
    this.token = this._userService.getToken();

    this._stationService.updateSensor(id,this.sensor,this.token).subscribe(
      response => {
        if(response.status == "success"){
          this.Chart();
        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }

  getSensor() {
    this.token = this._userService.getToken();
    this._route.params.subscribe(
      params => {
        let id = + params['id'];

        //obtener datos del sensor
        this._stationService.getSensor(id, this.token).subscribe(
          response => {
            if (response.status == 'success') {
              ///datos del sensor
              this.sensor = response.sensors[0];
              this.title = this.sensor.name;

              if (this.sensor.minValue != null && this.sensor.maxValue != null) {
                this.minVal = this.sensor.minValue;
                this.maxVal = this.sensor.maxValue;
              } else {
                this.maxVal = 100;
                this.minVal = 0;
              }

              //llamar a la grafica

              //llamar los ultimos 10 datos
              this._stationService.getTenData(id, this.token).subscribe(
                response => {
                  if (response.status == "success") {
                    this.Datas = response.data;
                    //console.log(this.Datas);
                  } else {
                    console.log('error');
                  }
                },
                error => {
                  console.log(<any>error);
                }
              );

            } else {
              console.log('error');
            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    );
  }


  Chart() {
    var id = this._route.snapshot.paramMap.get('id');
    this.token = this._userService.getToken();

    /*Recuperar la estacion  */
    this._stationService.getSensor(id, this.token).subscribe(
      response => {
        if (response.status == 'success') {
          ///datos del sensor
          var sensorDetail = response.sensors[0];
          //console.log(sensorDetail);

          if (sensorDetail.minValue != null && sensorDetail.maxValue != null) {
            this.plotMinVal = sensorDetail.minValue;
            this.plotMaxVal = sensorDetail.maxValue;
          } else {
            this.plotMinVal = 0;
            this.plotMaxVal = 100;
          }
          /*crear las opciones de la grafica a partir del json */
          this._stationService.getRealTimeDefaultData(id, this.token).subscribe(
            response => {

              this.Data = response;

              this.setx(this.Data[0].x);
              this.sety(this.Data[0].y);

              this.chartOptions = {
                chart: {
                  zoomType: 'x',
                  events: {
                    load: function(){
                      var s = this.series[0];
                    }
                  }

                },

                title: {
                  text: "Tiempo Real"
                },
                xAxis: {
                  type: 'datetime'
                },
                yAxis: {
                  title: {
                    text: 'Exchange rate'
                  },
                  plotLines: [{
                    value: this.plotMinVal,
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                      text: 'Minimo valor permitido: ' + this.plotMinVal
                    }
                  }, {
                    value: this.plotMaxVal,
                    color: 'red',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                      text: 'Maximo valor permitido: ' + this.plotMaxVal
                    }
                  }]
                },
                series: [{
                  name: 'Value',
                  data: this.Data,
                  type: 'areaspline',
                  tooltip: {
                    valueDecimals: 0
                  }
                }]
              };

              setInterval(() => {
                /*REcuperacion del ultimo dato desde la api*/

                var id = this._route.snapshot.paramMap.get('id');
                this.token = this._userService.getToken();

                this._stationService.getRealTimeDefault1(id, this.token).subscribe(
                  response => {
                    var oneData = response;
                    console.log(oneData[0].y);
                    console.log('Chart Updated.....');
                    var localx = oneData[0].x;
                    var localy = oneData[0].y;
                    console.log("get x "+ this.getx());
                    
                    if(this.getx()!=localx && this.gety() != localy){
                      this.chart.series[0].addPoint([localx, localy], true, true);
                      this.setx(localx);
                      this.sety(localy);
                      this.getSensor();
                    }
                  },
                  error => {
                    console.log(<any>error);
                  }
                );
                
              },15000);

              //console.log(this.Data.length);
            },
            error => {
              console.log(<any>error);
            }
          );
        }
      },
      error => {
        console.log(<any>error);
      });
  }

  getx() {
    return this.ultimox;
  }

  gety() {
    return this.ultimoy;
  }

  setx(x) {
    this.ultimox = x;
  }

  sety(y) {
    this.ultimoy = y;
  }

  

}