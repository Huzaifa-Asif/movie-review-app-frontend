import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  search_data = {
    title: ''
  };

  @Input() filmData: [];

  constructor(
    private route: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    console.log("film Component")
    console.log(this.filmData)
  }


  viewFilmDetail(id) {
    console.log("filmId: " + id)
    this.route.navigate(['/films', id]);
  }


}
