import { Component, OnInit, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { itemAnims } from '../../animation/item.animation';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnims
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {

  widerPriority = 'in';

  @Input() item ;
  @Input() avatar;
  @Output() itemsClick = new EventEmitter<void>();
  constructor() { }

  @HostListener('mouseenter')
  onMouseEnter() {
     this.widerPriority = 'out';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in';
  }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }
  onItemClick() {
    this.itemsClick.emit();
  }
  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }
}
