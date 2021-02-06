import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sessionData : any;
  currentUrl: string;
  allOrders=[]
  assignedOrders=[];
  showMenuu=false;
  constructor(private router: Router,location : Location, private auth: AuthService,) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = this.router.url);
    this.currentUrl =location.path();
   }

  ngOnInit() {
    this.sessionData = this.auth.getLocalTokens();
  
    setTimeout(() => {
      if ($(window).width() > 300 && $(window).width() < 767) {
        $(".menu").css({"display":"none"});
      }
    }, 2000);

  }

  showMenu(){
    if(this.showMenuu === false){
      if ($(window).width() > 300 && $(window).width() < 767) {
      $(".menu").css({"display":"block"});
      }
      this.showMenuu = true;
    } else {
      if ($(window).width() > 300 && $(window).width() < 767) {
      $(".menu").css({"display":"none"});
      }
      this.showMenuu = false;
    }

  }

  Logout(){
    this.auth.clearLocalTokens()
    this.router.navigate(['/login']);
  }
}
