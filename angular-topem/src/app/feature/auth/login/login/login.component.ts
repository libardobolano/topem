import { Component, OnInit } from '@angular/core';
import {FormBuilder,  Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {ResponseApi} from "../../../../core/models/_config/response-api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this.formBuilder.group({
    email: [null,[Validators.required]],
    password: [null,[Validators.required,Validators.minLength(6)]]
  });
  eventSubscribeLogin:any = null;
  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private spinner:NgxSpinnerService,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.spinner.show();
    console.log(this.formLogin.value);
    this.eventSubscribeLogin = this._authService.login(this.formLogin.value).subscribe((resp:ResponseApi)=>{
      localStorage.setItem('token',resp.data.token);
      this.router.navigate([`/admin`,'orders']);
    });
  }

  ngOnDestroy()
  {
    if(this.eventSubscribeLogin) this.eventSubscribeLogin.unsubscribe();
  }

}
