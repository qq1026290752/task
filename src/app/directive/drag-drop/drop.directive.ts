import { Directive, HostListener, ElementRef , Renderer2, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDroppable]'
})
export class DropDirective {

  @Input() dragenterClass: string;
  @Input() dragTags: string[] = [];
  private data$;
  constructor(
      private elemt: ElementRef,
      private rd: Renderer2,
      private drapServer: DragDropService) {
      this.data$ = this.drapServer.getDropData().take(1);
    }
  @HostListener('dragenter', ['$event'])
  onDragEnter(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.elemt.nativeElement === event.target) {
      this.rd.addClass(this.elemt.nativeElement, this.dragenterClass );
    }
  }
  @HostListener('dragover', ['$event'])
  onDragOver(event: Event) {
    if (this.elemt.nativeElement === event.target) {
    }
  }
  @HostListener('dragleave', ['$event'])
  onDragLeave(event: Event) {
    if (this.elemt.nativeElement === event.target) {
      this.rd.removeClass(this.elemt.nativeElement, this.dragenterClass );
    }
  }
  @HostListener('drop', ['$event'])
  onDrop(event: Event) {
    if (this.elemt.nativeElement === event.target) {
      this.rd.removeClass(this.elemt.nativeElement, this.dragenterClass );
    }
  }

}
