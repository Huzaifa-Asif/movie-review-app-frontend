import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase';
// import { MessagingServiceService } from './services/messaging-service.service';
// import { PushNotificationsService } from 'ng-push';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  message;
  constructor(
    // private _pushNotifications: PushNotificationsService,
    // private messagingService: MessagingServiceService,
    // public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }
  
  ngOnInit() {
    if(localStorage.getItem("laundry") != undefined){
    const userId = JSON.parse(localStorage.getItem("laundry")).uid;
    // this.messagingService.requestPermission(userId)
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage;
    }
  }

  // Auth logic to run auth providers
  AuthLogin() {
    // this.afAuth.auth
    // .signInWithPopup(new auth.FacebookAuthProvider())
    // .then(res => console.log(res));
  }
}
