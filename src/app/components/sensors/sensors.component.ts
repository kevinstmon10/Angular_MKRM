import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/Sensor';
import { StationService } from '../../services/station.service';
import { UserService } from '../../services/user.service';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../../models/Data';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css'],
  providers: [StationService, UserService]
})
export class SensorsComponent implements OnInit {
  public sensors: Sensor[]; 
  public token;
  public identity;
  public data: Data[] = [];

  constructor(
    private _stationService: StationService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getSensors();
  }

  getSensors(){
    this._route.params.subscribe(
      params =>{

        let id =+ params['id'];
        this.token = this._userService.getToken();

        this._stationService.getSensors(id, this.token).subscribe(
          response => {
            if(response.status == "success"){
              this.sensors = response.sensors;
              //data for last value
              for(let i=0; i< this.sensors.length; i++){
                this._stationService.getLastData(this.sensors[i].id, this.token).subscribe(
                  response => {
                    if(response.status == "success"){
                      this.data.push(response.data[0]);
                    }else{
                      console.log('error');
                    }
                  },
                  error =>{
                    console.log(<any>error);
                  }
                );
              }
              console.log(this.data);

            }else{
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
  

}
