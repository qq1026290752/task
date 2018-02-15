import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InivteProjectComponent } from '../inivte-project/inivte-project.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animation/routing.animations';
import { ListAnimation } from '../../animation/list.animations';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    ListAnimation
  ],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      'id': 1,
      'name': '企业协作平台',
      'desc': '这个是企业内部项目',
      'coverImg': 'assets/image/covers/0.jpg'
    },
    {
      'id': 2,
      'name': '企业协作平台',
      'desc': '这个是企业内部项目',
      'coverImg': 'assets/image/covers/1.jpg'
    }
  ];
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef ) { }
  @HostBinding('@routingAnimations') routingState;
  ngOnInit() {
  }
  openNerProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {dark : false,  title: '新建项目'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects,  {
        'id': 4,
        'name': '企业协作平台',
        'desc': '这个是企业内部项目',
        'coverImg': 'assets/image/covers/4.jpg'
      }];
      this.cd.markForCheck();
    });
  }
  launchInviteDialog() {
    this.dialog.open(InivteProjectComponent);
  }
  launchEditDialog() {
    this.dialog.open(NewProjectComponent, {data: {dark : false, title: '修改项目'}});
  }
  launchDelDialog(project) {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
        {data: {title: '删除项目', content: '您确认删除此项目?'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
      this.cd.markForCheck();
    });
  }
};