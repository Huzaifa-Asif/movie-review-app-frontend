import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../services/api/rest-api.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  user_data = {
    name: '',
    email: '',
    password: '',
  };

  userData : any;
  spinnerText = '';
  constructor(private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
    private route: Router) {
   }

  ngOnInit() {
  }

  registerUser(){
    if(this.user_data.name === '') {
      this.toastrService.error("Full Name is required");
      return false;
    }
    if(this.user_data.email === '') {
      this.toastrService.error("Email is required");
      return false;
    }
    var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    if(!emailFilter.test(this.user_data.email))
    {
      this.toastrService.error("Please provide valid email");
      return false;
    }
    if(this.user_data.password === '') {
      this.toastrService.error("Password is required");
      return false;
    }
   
      let data = {
        name : this.user_data.name,
        email : this.user_data.email,
        password : this.user_data.password
      }

      this._sendSaveRequest(data);
    } 

    _sendSaveRequest(data) {

      this.spinner.show();
      this.spinnerText = 'Please wait.... ';
      
      this.api.post('user/signup', data).then((response: any) => {
       console.log(response)
      if(response.status){
        this.spinner.hide();
        this.toastrService.success("Registered Successfully");
    
        setTimeout(() => {
          this.route.navigate(['/login']);
        }, 2500);
      }
      else{
        this.spinner.hide();
        this.toastrService.info(response.message);
      }  


      }, () => {
        this.toastrService.success("Failed!', 'Something went wrong, try again later.");
      });
    }



}
