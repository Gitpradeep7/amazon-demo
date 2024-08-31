import { Component } from '@angular/core';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartlength:number = 0;
  cartData: any = [];
  paidItem:any;
  paymentFlag:boolean = false;

  constructor(private nt: NetworkService) { }
  ngOnInit() {
    this.nt.loadMail();
    if (localStorage.getItem(`${this.nt.generateKey()}`)) {
      let data: any;
      data = localStorage.getItem(`${this.nt.generateKey()}`);
      data = JSON.parse(data);
      this.cartData = data;
    }
    this.cartlength = this.cartData.length;
    console.log(this.nt.generateKey())
    console.log(' this.nt.presentemail', this.nt.presentemail);
    console.log('this.cart', this.cartData);
  }
  payment(obj: any){
    console.log('payment item',obj);
    this.paidItem =obj;
    this.paymentFlag=true;
  }

  //removing from the cart
  removeFromCart(obj: any) {
    let mainData: any;
    mainData = localStorage.getItem('products');
    mainData = JSON.parse(mainData);
    obj.counting--;
    obj.rating.count++;
    if (obj.counting < 1) {
      this.cartData = this.cartData.filter((v: any) => obj.id != v.id);
    }
    let dindex = mainData.findIndex((v: any) => v.id == obj.id);
    mainData[dindex].rating.count = obj.rating.count;
    mainData[dindex].counting=obj.counting;
    let data: any;
    data = this.cartData;
    data = JSON.stringify(data);
    localStorage.setItem(`${this.nt.generateKey()}`, data);
    let d: any;
    d = mainData;
    d = JSON.stringify(d);
    localStorage.setItem('products', d);
  }

}
