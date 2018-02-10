import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
  @Input() header = '' ;
  @Output() newTask = new EventEmitter<void>();
  @Output() moveTaskAll = new EventEmitter<void>();
  @Output() delTaskAll = new EventEmitter<void>();
  @Output() editTable = new EventEmitter<void>();
  constructor() { }
  ngOnInit() {
  }

  onNewTaskClick() {
   this.newTask.emit();
  }
  moveAllClick() {
    this.moveTaskAll.emit();
  }
  onDelAllClick() {
    this.delTaskAll.emit();
  }
  editTableClick() {
    this.editTable.emit();
  }
}
