import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private rt:Router, private nt:NetworkService){
    this.nt.isAuthorized();

  }
  ngOnInit(){
    console.log('window',window.location.href);
  }
  renderToSU(){
   // this.nt.loggedIn=false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('presentemail')
    this.rt.navigate(['login']);
  }
  renderToHome(){
    this.rt.navigate(['home']);

  }
}
