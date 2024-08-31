import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-headpart',
  templateUrl: './headpart.component.html',
  styleUrls: ['./headpart.component.scss']
})
export class HeadpartComponent {
  // search:string='';
  @Input() cartlength:number =0;
  @Output() searchh = new EventEmitter();
  search:string='';
  flag: boolean = false;
  current: string = 'home';
  UserName = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : 'User';
  
  constructor(private rt: Router, private nt: NetworkService) { }
  ngOnInit() {
    this.current = 'home';
    let m: any;
    m = localStorage.getItem('currentUser');
    m = JSON.stringify(m);
    let d: any;
    d = localStorage.getItem(`${this.nt.generateKey()}`);
    d = JSON.parse(d);
    this.cartlength = d.length;
  }
  renderToCart() {
    this.search='';
    this.rt.navigate([`cart`]);
  }
  renderToLogout() {
    this.search='';
    this.rt.navigate([`logout`]);
  }
  renderToHome() {
    this.search='';
    this.rt.navigate([`home`]);
  }

  searching() {
    this.searchh.emit(this.search)
  }


}
