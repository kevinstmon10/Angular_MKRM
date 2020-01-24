import { Component, OnInit } from '@angular/core';
import { Station } from '../../models/Station';
import { StationService } from '../../services/station.service';
import { UserService } from '../../services/user.service';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css'],
  providers: [StationService, UserService]
})
export class StationComponent implements OnInit {
  public stations: Station[]; 
  public token;
  public identity;


  constructor(
    private _stationService: StationService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.getStations();
  }

  getStations(){
    this.token = this._userService.getToken();
    this._stationService.getStations(this.token).subscribe(
      response => {
        if(response.status == "success"){
         
          this.stations = response.stations;
          //console.log(this.stations);
        }else{
          console.log('error');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
