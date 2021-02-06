import { Injectable } from '@angular/core';
import { RestApiService } from '../api/rest-api.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  user = undefined;

  isAdmin = false;
  isCashier = false;


  constructor(private api: RestApiService, private router: Router) {

  }

  login(userDeatils) {
    return new Promise((resolve, reject) => {
      this.api.post('user/login', userDeatils).then((result: any) => {
        console.log('UserData', result);
       
        if (result.status) {
          this.user = result.data;
          this.saveLocalTokens(result._id, result.name, result.email) 
        }
        resolve(result);
      }, () => {
        resolve(false);
      });
    });
  }


  saveLocalTokens(id, name, email) {
    let data = {
      id: id,
      name: name,
      email:email
    };
    localStorage.setItem("movie-review-app", JSON.stringify(data));
  }

  getLocalTokens() {
    return JSON.parse(localStorage.getItem("movie-review-app"));
  }

  clearLocalTokens() {
    return localStorage.removeItem("movie-review-app");
  }


  logout() {
    // Reset:
    this.isLoggedIn = false;
    this.user = undefined;

    // Redirect:
    this.router.navigate(['/auth/login']);
  }


}
