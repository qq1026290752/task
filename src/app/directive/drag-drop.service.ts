import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export interface DropData {
  tag: string;
  data: any;
}
@Injectable()
export class DragDropService {

  constructor() { }

  private _dropData = new BehaviorSubject<DropData>(null);
  setDropData(data: DropData ) {
    this._dropData.next(data);
  }
  getDropData(): Observable<DropData> {
    return this._dropData.asObservable();
  }
  clearDropData() {
    this._dropData.next(null);
  }
}
