
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { RestApiService } from '../../services/api/rest-api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/services/auth/auth.service';
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
  sessionData;
  commentText;
  spinnerText = '';
  commentList;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {

    this.route.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.id = this.router.snapshot.paramMap.get("id");
    console.log("id: " + this.id)
  }

  ngOnInit() {
    this.sessionData = this.auth.getLocalTokens();
    this.getFilmDetail();
    this.getAllComments();
  }

  getFilmDetail() {
    this.api.get('film/get_by_id/' + this.id).then((response: any) => {
      console.log("Film Detail");
      console.log(response);
      this.filmData = response.data[0];
    });
  }

  getAllComments() {
    this.api.get('comment/get_all_by_filmid/' + this.id).then((response: any) => {
      console.log("Comment List");
      console.log(response);
      if(response.status){
        this.commentList = response.data;
      }
      
    });
  }

  submitComment(){
    if(this.commentText === '') {
      this.toastrService.error("Can't post empty comment");
      return false;
    }

    const data ={
      filmId: this.id,
      userId: this.sessionData.id,
      text: this.commentText
    }
    this._sendSaveRequest(data);
  }

  _sendSaveRequest(data) {

    this.spinner.show();
    this.spinnerText = 'Please wait.... ';
    
    this.api.post('comment/add', data).then((response: any) => {
     console.log(response)
    if(response.status){
      this.spinner.hide();
      this.toastrService.success("Comment Posted Successfully");
      this.commentText = ''
      this.getAllComments();
    }
    else{
      this.spinner.hide();
      this.toastrService.info(response.message);
    }  

    }, () => {
      this.toastrService.info("Failed!', 'Something went wrong, try again later.");
    });
  }


}
