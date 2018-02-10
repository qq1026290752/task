import { Component, OnInit } from '@angular/core';
import {getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  today = 'day_';
  constructor() { }

  ngOnInit() {
    this.today = `day_${getDate(new Date())}`;
  }


}
