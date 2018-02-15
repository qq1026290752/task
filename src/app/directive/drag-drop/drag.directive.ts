import { Directive, HostListener, ElementRef , Renderer2, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggble][draggerClass]'
})
export class DragDirective {
  private _isDraggble = false ;
  @Input('app-draggble')
  set Draggble(value: boolean) {
    this._isDraggble = value ;
    this.rd.setAttribute(this.elemt.nativeElement, 'draggable', `${value}`);
  }
  get Draggble() {
    return this._isDraggble;
  }
  @Input() draggerClass: string;
  @Input() dragTag: string;
  @Input() data: any;
  constructor(
      private elemt: ElementRef,
      private rd: Renderer2,
      private drapServer: DragDropService
    ) { }
  @HostListener('dragstart', ['$event'])
  onDragStart(event: Event) {
    if (this.elemt.nativeElement === event.target) {
      this.rd.addClass(this.elemt.nativeElement, this.draggerClass );
      this.drapServer.setDropData({tag: this.dragTag, data: this.data});
    }
  }
  @HostListener('dragend', ['$event'])
  onDragEnd(event: Event) {
    if (this.elemt.nativeElement === event.target) {
      this.rd.removeClass(this.elemt.nativeElement, this.draggerClass );
    }
  }

}
