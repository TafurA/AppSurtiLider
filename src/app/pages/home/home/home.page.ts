import { Component, OnInit } from '@angular/core';

import { BannerComponent } from 'src/app/component/banner/banner/banner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [BannerComponent]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
