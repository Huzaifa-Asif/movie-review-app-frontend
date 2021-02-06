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
  filmData;
  locationArray = [2344116, 638242, 44418, 565346, 560743, 9807];
  constructor(
    private route: Router,
    private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getAllFilms();
  }

  getAllFilms(){

   this.api.get('film/get_all').then((response: any) => {
        this.filmData = response.data;
    });
  
    console.log("Film Data")
    console.log(this.filmData)

  }

}
