
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  id;
  nodata;
  filmData;
  filmComment;
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
    this.id = this.router.snapshot.paramMap.get("id");
    console.log("id: " + this.id)
  }

  ngOnInit() {
    this.getFilmDetail();
  }

  getFilmDetail() {

    this.api.get('film/get_by_id/' + this.id).then((response: any) => {
      console.log("Film Detail");
      console.log(response);
      this.filmData = response.data[0];
    });


  }



  viewWeatherDetail(id) {
    console.log("id: " + id)
    this.route.navigate(['/weather', id]);
  }


}
