import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { slideToRight } from '../../animation/routing.animations';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
