import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  role : any;
  currentUrl: string;
  allOrders=[]
  assignedOrders=[];
  showMenuu=false;
  constructor(private router: Router,location : Location) {
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = this.router.url);
    this.currentUrl =location.path();
   }

  ngOnInit() {
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

}
