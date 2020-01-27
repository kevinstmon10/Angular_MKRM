import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/Sensor';
import { StationService } from '../../services/station.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../../models/Data';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [StationService, UserService]
})
export class HistoryComponent implements OnInit {
  public title: String;
  public token;
  public identity;
  public sensor: Sensor;
  options: Object;
  chart: Object;
  public Data;
  public Datas: Data[];
  public minVal;
  public maxVal;

  constructor(
    private _stationService: StationService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.sensor = new Sensor(1, "", "", "", "", "");

  }

  ngOnInit() {
    this.getSensor();
    this.Chart();
  }

  onUpdate(form){
    console.log(this.sensor);
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
              
              if(this.sensor.min_value != null && this.sensor.max_value != null){
                this.minVal = this.sensor.min_value;
                this.maxVal = this.sensor.max_value;
              }else{
                this.maxVal = 100;
                this.minVal = 0;
              }

              //llamar los ultimos 10 datos
              this._stationService.getTenData(id, this.token).subscribe(
                response => {
                  if(response.status == "success"){
                    this.Datas = response.data;
                    //console.log(this.Datas);
                  }else{
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

    this._stationService.getHistoyData(id, this.token).subscribe(
      response => {

        this.Data = response;
        this.options = {
          chart: {
            zoomType: 'x'
          },
          rangeSelector: {

            buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
            }, {
              type: 'hour',
              count: 12,
              text: '12h'
            }, {
              type: 'day',
              count: 1,
              text: '1d'
            }, {
              type: 'day',
              count: 3,
              text: '3d'
            }, {
              type: 'week',
              count: 1,
              text: '1s'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'month',
              count: 6,
              text: '6m'
            }, {
              type: 'year',
              count: 1,
              text: '1a'
            }, {
              type: 'all',
              text: 'All'
            }],
            selected: 3
          },
          title: {
            text: "Historial"
          },
          xAxis: {
            type: 'datetime'
          },
          series: [{
            value: 'Value',
            data: this.Data,
            type: 'areaspline',
            tooltip: {
              valueDecimals: 0
            }
          }]
        };


        //console.log(this.Data);
      },
      error => {
        console.log(<any>error);
      }
    );
  }



}
