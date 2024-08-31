import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login:FormGroup;
  emailboolean: boolean=false;
  emailId:string='';
  AllData:any;
  loginDataObj:any={};
  
  ermsg:string='please enter email';
  constructor(private fb:FormBuilder,private rt:Router,private nt:NetworkService){
    this.nt.iflogged();
    this.login=this.fb.group({
      email :['',[Validators.required,Validators.email]],
      password :['',[Validators.required,Validators.minLength(8)]],
    })
  }
  ngOnInit()
  {
    this.AllData = localStorage.getItem('amazoncustomers');
    this.AllData= JSON.parse(this.AllData);
    console.log(this.AllData);
    
  }
  renderToSU(){
    this.rt.navigate(['signup']);
  }
  checkEmail() {
    this.nt.email=this.emailId;
    this.emailboolean=this.nt.checkEmail();
  }
  onlogin(){
    this.loginDataObj=this.login.value;
    let d:any;
    d = this.loginDataObj;
    d = JSON.stringify(d);
    localStorage.setItem('currentUser',d);
    let curMail = this.loginDataObj.email;
  
    let mailIndex = this.AllData.findIndex((v:any)=> v.emailid==curMail);
    let passcheck = this.AllData[mailIndex];
    
    this.nt.presentemail = curMail;
    localStorage.setItem('presentemail',curMail)
    localStorage.setItem('currentUser',passcheck.fname);

    if(this.loginDataObj.password == passcheck.password)
    {
    //  this.nt.loggedIn = true;
      this.rt.navigate(['home']);
    }
    else{
    console.log('NOt Valid');
    alert('your password or email is not valid');
    }
  }


}
