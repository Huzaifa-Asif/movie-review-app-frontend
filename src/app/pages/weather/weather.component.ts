import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  search_data = {
    title: ''
  };

  @Input() weatherData: [];

  constructor(
    private route: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    console.log("weather Component")
    console.log(this.weatherData)
  }


  viewWeatherDetail(woeid) {
    console.log("woeid: " + woeid)
    this.route.navigate(['/weather', woeid]);
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
