import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  public loginForm!: FormGroup
  registerForm: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private http : HttpClient) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupusers")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
      
        this.loginForm.reset();
        this.router.navigate(['register'])
      }else{
        alert("user not found");
      }
    },err=>{
      alert("Something went wrong");
    }
    )

  }

}
