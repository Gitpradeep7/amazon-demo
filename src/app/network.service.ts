import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  search:string='';
  AllData: any;
  url = 'https://fakestoreapi.com/products';
  sp: number = 0;
  name: string = '';
  listName: string = '';
  phoneNo: string = '';
  // phoneCheck: boolean = false;
  email: string = '';
  presentemail: string = '';
  cartCount: number = 0;
  data: any;
  flag: boolean = false;
  oriData: any;
  // loggedIn: boolean = false;
  constructor(private http: HttpClient, private rt: Router) { }
  ngOnInit() {
    // this.http.get(this.url).subscribe((res: any) => {
    //   (console.log(res))
    // })
    //this.getDataa();
  }
  loadMail() {
    let d: any;
    d = localStorage.getItem('presentemail');
    d = JSON.stringify(d);
    this.presentemail = d;
  }
  
  getData() {
    return this.http.get(this.url);
  }
  checkEmail() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(this.email);
  }
  checkName(e: KeyboardEvent) {
    let n = e.keyCode;
    if (this.sp == n) {
      return e.preventDefault();
    }
    else if (!(n >= 65 && n <= 90) && (n != 8) && (n != 32)) {
      return e.preventDefault();
    }
    this.sp = n == 32 ? 32 : -1;
  }

  checkNum(e: KeyboardEvent, inp: any) {
    let n = e.keyCode;
    console.log(n);
    console.log('inp', inp)
    if (!(n >= 48 && n <= 57) && (n != 8)) {
      return e.preventDefault();
    }
  }
  generateKey() {
    return this.presentemail;
  }
  isAuthorized() {
    if (((window.location.pathname == '/home') || (window.location.pathname == '/amazon') || (window.location.pathname == '/logout')) && !(localStorage.getItem('presentemail'))) {
      this.rt.navigate(['login']);

    }
  }
  iflogged(){
    if (((window.location.pathname == '/login') || (window.location.pathname == '/signup') || (window.location.pathname == '')) && (localStorage.getItem('presentemail'))) {
      this.rt.navigate(['home']);

    }
  }
}
//    if (!((window.location.pathname == '/login') ||(window.location.pathname != '/signup')  ) && !(localStorage.getItem('presentemail'))) {

