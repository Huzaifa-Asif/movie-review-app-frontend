import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../services/api/rest-api.service';

import { Observable } from 'rxjs';

import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {
  id : any;

  film_data = {
    name: '',
    description: '',
    realeaseDate: '',
    rating: '',
    ticketPrice: '',
    country: '',
    photo: '',
  };

  selectedGenreList
  
  genreList = [
    {name:'Action'},
    {name:'Comedy'},
    {name:'Drama'},
    {name:'Fantasy'},
    {name:'Mystery'},
    {name:'Romance'},
    {name:'Thriller'},
    {name:'Adventure'},
  ]

  filmImage = [];
  filmImageUrl = [];

  downloadURL: Observable<string>;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  tests: Observable<any[]>;
  uploadedImage : any;
  userData : any;
  spinnerText = '';
  form: FormGroup;

  constructor(private toastrService: ToastrService,
    private api: RestApiService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private route: Router) {
      this.form = this.fb.group({
        genreArray: this.fb.array([])
      })
   }

  ngOnInit() {
  }


  submitFilm(){
    console.log(this.form.value.genreArray)
    if(this.film_data.name === '') {
      this.toastrService.error("Film Name is required");
      return false;
    }
    if(this.film_data.realeaseDate === '') {
      this.toastrService.error("Realease Date is required");
      return false;
    }
    if(this.film_data.rating === '') {
      this.toastrService.error("Rating is required");
      return false;
    }
    if(this.filmImageUrl.length == 0) {
      this.toastrService.error("Film Picture is required");
      return false;
    }
    if(this.film_data.ticketPrice === '') {
      this.toastrService.error("Ticket Price is required");
      return false;
    }
    if(this.film_data.country === '') {
      this.toastrService.error("Country is required");
      return false;
    }
    if (this.form.value.genreArray.length < 1) {
      this.toastrService.error("Kindly select atleast 1 Genre");
      return false;
    }
    if(this.film_data.description === '') {
      this.toastrService.error("Description is required");
      return false;
    }

      const formData: any = new FormData();
      formData.append('name', this.film_data.name);
      formData.append('description', this.film_data.description);
      formData.append('realeaseDate', this.film_data.realeaseDate);
      formData.append('rating', this.film_data.rating);
      formData.append('ticketPrice', this.film_data.ticketPrice);
      formData.append('country', this.film_data.country);
      formData.append('genre', this.form.value.genreArray);
      for(let i =0; i < this.filmImage.length; i++){
        formData.append("photo", this.filmImage[i], this.filmImage[i]['name']);
      }

      this._sendSaveRequest(formData);
    } 

    _sendSaveRequest(data) {

      this.spinner.show();
      this.spinnerText = 'Please wait..... ';
      
      this.api.post('film/add', data).then((response: any) => {
       
      if(response.status){
        this.spinner.hide();
        this.toastrService.success("Film Added Successfully");
    
        setTimeout(() => {
          this.route.navigate(['/films']);
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


    filmImageUpload(){
      $('#filmImage').trigger('click');
    }
  
    filmImageGetfiles(event){
      const files: Array<File> = event.target.files;
  
        console.log("this.filmImageUrl.length "+this.filmImageUrl.length)
  
        if(this.filmImageUrl.length >0){
          alert("You can add only one Image");
          return false;
        }
  
        else{
  
          for(let i =0; i < files.length; i++){
            let reader = new FileReader();
            
            reader.onload = (e: any) => {
              this.filmImageUrl.push(e.target.result);
           }
  
          reader.readAsDataURL(files[i]);
          this.filmImage.push(event.target.files[i]); 
  
        };
  
        console.log(this.filmImage)
        }
  
    }

    removeImage(index,type){
      if(type=='filmImage'){
        this.filmImageUrl.splice(index,1);
        this.filmImage.splice(index,1);
        console.log(this.filmImage)
      }
    }


    onCheckboxChange(e) {
    
      const checkArray: FormArray = this.form.get('genreArray') as FormArray;
  
      if (e.target.checked) {
        checkArray.push(new FormControl(e.target.value));
      } else {
        let i: number = 0;
        checkArray.controls.forEach((item: FormControl) => {
          if (item.value == e.target.value) {
            checkArray.removeAt(i);
            return;
          }
          i++;
        });
      }
  
  
    }


}

