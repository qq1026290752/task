import { Component, OnInit } from '@angular/core';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InivteProjectComponent } from '../inivte-project/inivte-project.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      'name': '企业协作平台',
      'desc': '这个是企业内部项目',
      'coverImg': 'assets/image/covers/0.jpg'
    },
    {
      'name': '企业协作平台',
      'desc': '这个是企业内部项目',
      'coverImg': 'assets/image/covers/1.jpg'
    }
  ];
  constructor(private dialog: MatDialog) { }
  ngOnInit() {
  }
  openNerProjectDialog() {
    this.dialog.open(NewProjectComponent, {data: {dark : false,  title: '新建项目'}});
  }
  launchInviteDialog() {
    this.dialog.open(InivteProjectComponent);
  }
  launchEditDialog() {
    this.dialog.open(NewProjectComponent, {data: {dark : false, title: '修改项目'}});
  }
  launchDelDialog() {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
        {data: {title: '删除项目', content: '您确认删除此项目?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}