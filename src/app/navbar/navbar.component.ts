import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent  {
  
  
  constructor() {
    
  }
  
  redirectToLoginRegister() {
    window.location.href='//api.booki.me/oauth2/authorize?client_id=bookiFrontend&response_type=code&redirect_uri=booki.me/assets/serverscripts/loginRedirector.php';
  }
}
