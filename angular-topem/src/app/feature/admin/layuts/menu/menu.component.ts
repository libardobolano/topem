import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../core/services/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ResponseApi } from "../../../../core/models/_config/response-api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isCollapsed:boolean = true;
  eventLogOut:any = null;
  constructor(
    private spinner:NgxSpinnerService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy()
  {
    if(this.eventLogOut) this.eventLogOut.unsubscribe();
  }

  onShown()
  {
    this.isCollapsed = false;
  }

  onHidden()
  {
    this.isCollapsed = true;
  }

  logOut()
  {
    this.spinner.show();
    this.eventLogOut = this.authService.logout().subscribe((resp:ResponseApi)=>{
      this.spinner.hide();
      localStorage.removeItem('token');
      this.router.navigate(['/auth','login']);
    });
  }

}
