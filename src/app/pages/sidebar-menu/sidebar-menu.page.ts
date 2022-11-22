import { Component, OnInit } from '@angular/core';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.page.html',
  providers: [MenuFixedComponent]
})
export class SidebarMenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
