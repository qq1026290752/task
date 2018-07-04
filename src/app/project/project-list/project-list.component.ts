import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InivteProjectComponent } from '../inivte-project/inivte-project.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animation/routing.animations';
import { ListAnimation } from '../../animation/list.animations';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';

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
  projects = [];
  constructor(private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private projectService$: ProjectService ) { }
  @HostBinding('@routingAnimations') routingState;
  ngOnInit() {
    this.projectService$.get('1').subscribe(projects => {
      this.projects = projects;
      // 需要脏值检测
      this.cd.markForCheck();
    });
  }
  openNerProjectDialog() {
    const selectedImage = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {thumbnails : this.getThumbnails(), img: selectedImage}});
    dialogRef.afterClosed()
      .filter(n => n)
      .map(val => ({...val , coverImg: this.buiderImgSrc( val.coverImg)}))
      .switchMap(v => this.projectService$.add(v))
      .subscribe(project => {
          this.projects = [...this.projects, project];
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

  private getThumbnails() {
    return _.range(0, 40)
      .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buiderImgSrc(img: string): string {
    const  im = img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
    console.log(im);
    return im;
  }
}
