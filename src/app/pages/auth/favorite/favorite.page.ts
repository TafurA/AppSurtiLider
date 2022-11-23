import { Component, OnInit } from '@angular/core';
import { HeaderBackComponent } from 'src/app/component/layout/header-back/header-back.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
  providers: [HeaderBackComponent]
})
export class FavoritePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
