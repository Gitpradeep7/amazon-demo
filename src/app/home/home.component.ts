import { Component, Injectable } from '@angular/core';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  removeBoolean:boolean = false;
  data: any = [];
  oriData: any = [];
  currCart: any = [];
  search: string = '';
  listName: string = '';
  flag: boolean = false;
  headpartMenu= ['All','Men','Women','Jewelery','Electronics'];
  UserName = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : 'User';
  current: any;
  cartlen:number = 0;
  id:number = -1;


  constructor(private nt: NetworkService, private rt: Router) { 
    this.nt.isAuthorized();
  }
  ngOnInit() {
    if (localStorage.getItem('products')) {
      let temp: any = localStorage.getItem('products');
      //console.log('if condition runs and data is ', temp);
      this.data =  JSON.parse(temp);
    } else {
      this.nt.getData().subscribe((response: any) => {
        this.data = response;
       // console.log('printing data ', response);
        localStorage.setItem('products', JSON.stringify(this.data));
      });
     // console.log('else condition called ', this.data);
    }
    this.oriData = this.data.map((v:any)=>v.counting=0);
    this.oriData = this.data;
    console.log('this.oridata',this.oriData);
    console.log('thsi.data',this.data)
    this.nt.loadMail();
    console.log(' this.nt.presentemail', this.nt.presentemail);
  }

  ngDoCheck(){
    this.listName='';
    this.listName= this.nt.listName;
    if(this.listName)
    {
      this.data= this.oriData;
    this.data = this.data.filter((v:any)=>v.category.includes(this.listName.toLowerCase()) && v.category.startsWith(this.listName.toLowerCase()))
    }
    else{
      this.data = this.oriData;
      this.displaySearch(this.search)
    }
   }
   displaySearch(s:any){
    console.log("seraching - ", s);
    
     this.search=s;
     this.data= this.oriData;
       this.data = this.search === '' ? this.oriData : this.data.filter((item: any) => {
         return JSON.stringify(Object.values(item)).toLowerCase().includes(this.search.toLowerCase()) ? item : '';
       })
   }
  
  list(val:any){
    this.search='';
    this.current = val;
    if(val!='All')
    {
      this.nt.listName=val;
    }
    else{
      this.nt.listName ='';
    }
  }
  renderToCart() {
    this.rt.navigate(['/cart']);
  }
  renderToLogout() {
    this.rt.navigate(['/logout']);
  }
  renderToHome() {
    this.rt.navigate(['/home']);
  }
  remove(obj:any){
    this.data = this.oriData;

    let d: any;
    d = localStorage.getItem(`${this.nt.generateKey()}`);
    d = JSON.parse(d);
    this.currCart = d;
    obj.counting--;
    obj.rating.count++;
    if(obj.counting < 1)
    {
      this.removeBoolean=false;
      this.currCart = this.currCart.filter((v:any)=> obj.id !=v.id);
    }
     let dindex = this.data.findIndex((v: any) => v.id == obj.id);
     this.data[dindex].rating.count = obj.rating.count;
     this.data[dindex].counting = obj.counting;
     let dd :any;
     dd = this.currCart;
     dd = JSON.stringify(dd);
     localStorage.setItem(`${this.nt.generateKey()}`, dd);
     let b:any;
     b = this.data;
     this.oriData = this.data;
    b = JSON.stringify(b);
   localStorage.setItem('products', b);
    }
  
  addToCart(obj: any) {
    this.id = obj.id;
    this.data = this.oriData;
    this.removeBoolean=true;
    if (localStorage.getItem(`${this.nt.generateKey()}`)) {
      let d: any;
      d = localStorage.getItem(`${this.nt.generateKey()}`);
      d = JSON.parse(d);
      this.currCart = d;
      let cartdex = this.currCart.findIndex((v: any) => v.id === obj.id);
      //duplicate item to be stored in cart
      obj.rating.count--;
      obj.counting++;
      if (cartdex != -1) {
        let objind=this.data.findIndex((v:any)=> v.id == this.currCart[cartdex].id);
       this.currCart[cartdex].rating.count = obj.rating.count;
       this.data[objind].rating.count = this.currCart[cartdex].rating.count;
       this.currCart[cartdex].counting=obj.counting;
      }
      else {
        this.currCart.push(obj);
      }
    }
    else {
      this.currCart.push(obj);
    }
    //count the length of the cart
    this.cartlen = this.currCart.length;
    let temp = JSON.stringify(this.currCart);
    localStorage.setItem(`${this.nt.generateKey()}`, temp)
    this.oriData = this.data;
    let tempdata = JSON.stringify(this.data);
    localStorage.setItem('products',tempdata);

  }

}
