import { Input, Output, Component, OnInit, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { cardAnims } from '../../animation/cart.animation';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnims
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input() item;
  @Output() invite = new EventEmitter<void>();
  @Output() editProject = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out';
  constructor() { }

  ngOnInit() {
  }
  @HostListener('mouseenter')
  onMouseEnter() {
     this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  onInviteClick() {
    this.invite.emit();
  }
  onEditProjectNodeClick() {
    this.editProject.emit();
  }
  onDelClick() {
    this.deleteProject.emit();
  }
}
