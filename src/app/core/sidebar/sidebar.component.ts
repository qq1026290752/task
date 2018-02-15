import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {getDate } from 'date-fns';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() navClick = new EventEmitter<void>();
  today = 'day_';
  constructor() { }

  ngOnInit() {
    this.today = `day_${getDate(new Date())}`;
  }
  onMoverClick() {
    this.navClick.emit();
  }

}
