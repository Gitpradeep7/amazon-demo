import { Component } from '@angular/core';
import { NetworkService } from '../network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['./amazon.component.scss']
})
export class AmazonComponent {
  data:any=[];
  current:string='All';
  oriData:any=[];
  currCart:any=[];
  listName:string='';
  flag: boolean=true;
  headpartMenu= ['All','Men','Women','Jewelery','Electronics'];

  constructor(private nt: NetworkService,private rt:Router){
    this.nt.isAuthorized();
  } 
  ngOnInit(){
    console.log('window',window.location.href);
    this.nt.getData().subscribe(val=>{
      this.data=val;
      this.oriData=this.data.map((v:any)=> Object.defineProperty(v, 'counting', { value: 0, writable: true }))
      this.data=this.oriData;
      console.log('this.ori',this.oriData)
    })
    this.nt.loadMail();
    console.log('this.daata',this.data)
  }
 
  list(val:any){
    this.current = val;
    if(val!='All')
    {
      this.nt.listName=val;
    }
    else{
      this.nt.listName ='';
    }
  }
  ngDoCheck(){
      this.listName='';
      this.listName= this.nt.listName;
      console.log('this.listName',this.listName)
      if(this.listName)
      {
        this.data= this.oriData;
  
      this.data = this.data.filter((v:any)=>v.category.includes(this.listName.toLowerCase()) && v.category.startsWith(this.listName.toLowerCase()))
      }
      else{
        this.data = this.oriData;
      }
     }


  addToCart(obj:any){
    if(localStorage.getItem(`${this.nt.generateKey()}`))
    {
      let d:any;
      d=localStorage.getItem(`${this.nt.generateKey()}`);
      d=JSON.parse(d);
      this.currCart=d;
      let cartdex = this.currCart.findIndex((v:any)=>v.id === obj.id)
      console.log('ths.nt.generatekey',`'${this.nt.generateKey()}'`)
      obj.counting++;
      obj.rating.count--;
      if(cartdex != -1)
      {
        console.log('obj.counting',obj.counting)
        console.log('obj',obj)
        //this.currCart.push(obj) 
      }
      else{

        this.currCart.push(obj); 
      }
      console.log('cartdex',cartdex)
    }
    else{
      this.currCart.push(obj);
    }
    
    let temp = JSON.stringify(this.currCart);
    localStorage.setItem(`${this.nt.generateKey()}`,temp)
    console.log(`${this.nt.generateKey()}`,temp);
  }

}
