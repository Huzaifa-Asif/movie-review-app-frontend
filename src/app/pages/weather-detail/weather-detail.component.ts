import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';


import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  woeid;
  nodata;
  weatherData;
  weatherDataWeekly;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
  ) {

    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.woeid = this.router.snapshot.paramMap.get("woeid");
    console.log("woeid: " + this.woeid)
  }

  ngOnInit() {
    this.getWeatherDetail();
  }

  getWeatherDetail() {

    this.api.get('location/' + this.woeid).then((response: any) => {
      console.log("Weather search");
      console.log(response);
      this.weatherData = response;
      this.weatherDataWeekly = response.consolidated_weather;
    });


  }



  viewWeatherDetail(woeid) {
    console.log("woeid: " + woeid)
    this.route.navigate(['/weather', woeid]);
  }


}
