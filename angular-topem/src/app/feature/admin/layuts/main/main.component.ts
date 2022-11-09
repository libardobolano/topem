import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  adminClass:string[] = ['sidebar-mini','layout-fixed'];
  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    for (let className of this.adminClass)this.renderer.addClass(document.body, className);
  }

  ngOnDestroy(): void {
    for (let className of this.adminClass)this.renderer.removeClass(document.body, className);
  }

}
