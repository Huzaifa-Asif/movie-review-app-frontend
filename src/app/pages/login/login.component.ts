import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../services/api/rest-api.service';
import { AuthService } from '../../services/auth/auth.service';

import { Observable } from 'rxjs';

import { NgxSpinnerService } from "ngx-spinner";

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_data = {
    email: '',
    password: ''
  };
  spinnerText = '';
  showPanel = false;
  role = 3;
  constructor(
    private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit() {}

  login() {

    if(this.login_data.email === '') {
      this.toastrService.error("Email is required");
      return false;
    }
    var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if(!emailFilter.test(this.login_data.email))
    {
      this.toastrService.error("Please provide valid email");
      return false;
    }
    if(this.login_data.password === '') {
      this.toastrService.error("Password is required");
      return false;
    }
    this.sendLoginRequest();
  }

  sendLoginRequest(){
    this.spinner.show();
    this.spinnerText = 'Logging in..';
   
    this.auth.login(this.login_data).then((result: any) => {
   
      if (result.status) {
        this.spinner.hide();
        console.log(this.auth.user);
        this.toastrService.success('Welcome ' + result.data.name, ' Successfully Authenticated!');
        this.route.navigateByUrl('/films');
       
      } else if (!result.status) {
        this.spinner.hide();
        this.toastrService.error(result.message);
      } 
      else {
        this.spinner.hide();
        this.toastrService.error("kindly try again");
      }

  
    });
  }

 register() {
   this.route.navigate(['/register_user']);
 }
 
 
}

