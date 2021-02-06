import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';


import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  search_data = {
    title: ''
  };
  search_title;
  nodata;
  weatherData = [];
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
    this.search_title = this.router.snapshot.paramMap.get("search_title");
    console.log("search_title: "+this.search_title)
  }

  ngOnInit() {
    this.getSearchWeather();
  }

  getSearchWeather(){
    this.api.get('location/search/?query='+this.search_title).then((response: any) => {
      console.log("location search");
      console.log(response);
      if(response.length>0){
        this.api.get('location/'+response[0].woeid).then((response: any) => {
          console.log("Weather search");
          console.log(response);
          this.weatherData.push(response)
        });
      }
      else{
        this.nodata= true;
      }
    });
    
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
