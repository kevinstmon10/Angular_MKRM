import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.user = new User(1,"","","","","","","");
    this.title = "Ingresar";
   }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form){
    this._userService.login(this.user).subscribe(
      response => {
        if(response.status == "success"){
          //cargar identity
          this.identity = response.user;

          localStorage.setItem('identity', JSON.stringify(this.identity));
            //token
            this._userService.login(this.user, true).subscribe(
              response => {
                if(response.status == "success"){
                  this.token = response.token;
                  localStorage.setItem('token', this.token);

                  //reedireccion al index 
                  this._router.navigate(['home']);
                }else{
                  console.log('error');
                }
              },
              error => {
                console.log(<any>error);
              }
            )
        }else{
          console.log('error');
        }
      },
      error => {
        
        console.log(<any>error);
      }
    );

  }


  logout(){
    this._route.params.subscribe(
      params =>{
        let logout =+ params['sure'];

        if(logout == 1){
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;

          this._router.navigate(['home']);
        }else{

        }

      }
    )
  }
}
