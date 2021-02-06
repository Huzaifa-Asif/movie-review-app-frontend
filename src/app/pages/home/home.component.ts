import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search_data = {
    title: ''
  };
  weatherData = [];
  locationArray = [2344116, 638242, 44418, 565346, 560743, 9807];
  constructor(
    private route: Router,
    private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    // this.getWeather();
  }

  getWeather(){
    let i=0;
    for(i; i<this.locationArray.length; i++){
      this.api.get('location/'+this.locationArray[i]).then((response: any) => {
        this.weatherData.push(response);
        console.log(response);
      });
    }

    console.log("weather Data")
    console.log(this.weatherData)

  }

  search() {

    if (this.search_data.title === '') {
      this.toastrService.error("Kindly Enter name of City");
      return false;
    }
    console.log("Search: " + this.search_data.title)
    this.route.navigate(['/search', this.search_data.title]);
  }


}
