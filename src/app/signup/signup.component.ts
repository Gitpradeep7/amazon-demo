import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signup: FormGroup;
  firstName: string='';
  ph:string='';
  signUpObj:any={};
  signUpData:any=[];
  email: string='';
  em:string='';
  password: string='';
  mes:string='';
  message:string='';
  passFlag:boolean=true;

  emailboolean: boolean=true;
  
  constructor(private fb:FormBuilder,private rt: Router,private nt:NetworkService ){
    this.nt.iflogged();

    this.signup=this.fb.group({
      fname: ['',[Validators.required,Validators.maxLength(15)]],
      lname: ['',[Validators.required,Validators.maxLength(15)]],
      phoneNo:['',Validators.required,Validators.maxLength(10)],
      emailid :['',[Validators.required,Validators.email]],
      password :['',[Validators.required,Validators.minLength(8)]],
      Conpassword :['',[Validators.required,Validators.minLength(8)]]
    })
  }
  checkName(e: KeyboardEvent) {
    this.nt.checkName(e);
  }
  checkEmail() {
    this.nt.email=this.em;
    this.emailboolean=this.nt.checkEmail();
  }

  checkNum(e: KeyboardEvent) {
    this.nt.checkNum(e, this.ph);
  
  }

  comparePass(){
    if(this.signup.controls['password'].value==this.signup.controls['Conpassword'].value)
    {
      this.passFlag=false;
      console.log(this.signup.controls['password'].value);
      console.log(this.signup.controls['Conpassword'].value);
    }
  }
  onSubmit(){
    this.signUpObj = this.signup.value;
    console.log('data',this.signUpObj);
    this.firstName=this.signUpObj.fname;
    console.log('fname',this.firstName)
    this.nt.name= this.firstName;
    if(localStorage.getItem('amazoncustomers'))
    {
      console.log('jjeee')
       let data:any;
       data = localStorage.getItem('amazoncustomers');
       data = JSON.parse(data);
       console.log('all data',data);
      let emailIndex = data.findIndex((val: any) => val.emailid == this.signUpObj.emailid );
      let phIndex = data.findIndex((val:any)=>val.phoneNo == this.signUpObj.phoneNo)
      let rec = data.filter((val:any)=>val.email == this.signUpObj.email);

      console.log(emailIndex);
      console.log(phIndex)
      
      if(emailIndex == -1 && phIndex == -1 )
      {
        this.signUpData=data;
        this.signUpData.push(this.signUpObj)
        console.log('this.sign',this.signUpData);
        this.signup.reset();
        this.goToLogin();

      }
      else{
        this.signUpData = data;
        console.log('already data is used');
        alert('already data is used')
        this.signup.reset();
      }
    }
    else{
      this.signUpData.push(this.signUpObj);
      this.signup.reset();
      console.log('this.signData',this.signUpData);
      this.goToLogin();
    }
    console.log('ddddd',this.signUpData);
    let m = JSON.stringify(this.signUpData);
    console.log('m',m);
    localStorage.setItem('amazoncustomers',m);
  }
  goToLogin(){
    this.rt.navigate(['login']);
  }
  }

    
  

