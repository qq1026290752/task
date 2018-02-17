import { Component, OnInit, HostListener, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
  desc: string;
  @Output() quickTask = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  @HostListener('keyup.enter')
  onSendQuickTask() {
    this.desc = this.desc.trim();
    if (!this.desc || this.desc.length == null) {
      return ;
    }
    this.quickTask.emit(this.desc);
    this.desc = '';
  }
}
