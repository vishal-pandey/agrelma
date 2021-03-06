import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../../admin/services/auth.service';

import { CookieService } from 'ngx-cookie-service';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


	message:string;
  constructor(public authService: AuthService, 
    public router: Router, 
    private cookieService:CookieService) { 

  	this.message = "Enter Username And Password and click Login Button";
    if (this.authService.isLoggedInn()) {
      this.router.navigate(['/admin/producer']);
    }
  }


  key:any;
  config: Config;

  login(id:any, pwd:any) {
    this.message = "Loggin in ... ";
    this.authService.getLogin(id,pwd).subscribe((data:any) => {
      this.config = { ...data }
      if (data.status == 'true') {
        console.log(data);
        this.message = "Logged In";
        this.cookieService.set("admin",data.HTTP_Authorization,360000,"/");
        this.cookieService.set("admin_type",data.type,360000,"/");
        this.router.navigate(['/admin/producer']);
      }else{
        console.log(data);
        this.message = data.error;
      }
      if (this.config.key == 'success') {
        this.message = "Logged In";
        this.cookieService.set("admin",this.config.value,360000,"/");
        // this.router.navigate(['/']);
        window.location.href = "./";
      }else{
        // this.message = this.config.key;
      }

    })
  }


  ngOnInit() {
  }

}


export interface Config {
  key: string;
  value: string;
}