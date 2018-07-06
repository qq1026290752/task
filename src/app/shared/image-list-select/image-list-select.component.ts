import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,  FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    }
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input() cols = 6 ;
  @Input() rowHeight = '64px';
  @Input() title = '选择:';
  @Input() items: string[] = [];
  selected: string;
  @Input() useSvgIcon = false;
  @Input() imageWidth = '80px';
  private propagateChange = (_: any) => {};

  constructor() { }
  onnChange(i) {
    this.selected = this.items[i];
  }

  writeValue(obj: any): void {
    this.selected = obj;
    this.propagateChange(this.selected);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
          validate: false
      }
    };
  }
}
