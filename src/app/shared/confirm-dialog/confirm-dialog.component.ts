import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirm-dialog',
  template: `
  <h2 mat-dialog-title>{{title}}</h2>
  <div mat-dialog-content>
      {{content}}
  </div>
  <div mat-dialog-actions>
    <button type="button" mat-raised-button color="primary" (click) = "onClick(true);">确定</button>
    <button type="button" mat-button mat-dialog-close (click) = "onClick(false);">关闭</button>
  </div>
  `,
  styles: []
})
export class ConfirmDialogComponent implements OnInit {

  title = '';
  content = '';
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.content = this.data.content;
    this.title = this.data.title;
  }
  onClick(result: Boolean) {
    this.dialogRef.close(result);
  }

}
