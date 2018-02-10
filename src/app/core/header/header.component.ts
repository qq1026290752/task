import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkTheme = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}
  openSidebar() {
    //发射事件,给父类
    this.toggle.emit();
  }
  onChange(chencked: boolean) {
    this.toggleDarkTheme.emit(chencked);
  }
}