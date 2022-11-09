import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginClass:string[] = ['hold-transition','login-page'];
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    for (let className of this.loginClass)this.renderer.addClass(document.body, className);
  }

  ngOnDestroy(): void {
    for (let className of this.loginClass)this.renderer.removeClass(document.body, className);
  }

}
