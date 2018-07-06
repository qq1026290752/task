import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InivteProjectComponent } from '../inivte-project/inivte-project.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../animation/routing.animations';
import { ListAnimation } from '../../animation/list.animations';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../domain/index';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

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
export class ProjectListComponent implements OnInit , OnDestroy {
  projects = [];
  sub: Subscription;
  constructor(private dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private projectService$: ProjectService ) { }
  @HostBinding('@routingAnimations') routingState;
  ngOnInit() {
   this.sub =  this.projectService$.get('1').subscribe(projects => {
      this.projects = projects;
      // 需要脏值检测
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  openNerProjectDialog() {
    const selectedImage = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {thumbnails : this.getThumbnails(), img: selectedImage}});
    dialogRef.afterClosed()
      .take(1) // 只取一个值
      .filter(n => n)
      .map(val => ({...val , coverImg: this.buiderImgSrc( val.coverImg)}))
      .switchMap(v => this.projectService$.add(v))
      .subscribe(project => {
          this.projects = [...this.projects, project];
          this.cd.detectChanges();
      });
  }
  launchInviteDialog() {
    this.dialog.open(InivteProjectComponent);
  }
  launchEditDialog(oldProject: Project) {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {thumbnails : this.getThumbnails(), project: oldProject}});
    dialogRef.afterClosed()
      .take(1) // 只取一个值
      .filter(n => n)
      .map(val => ({...val , id: oldProject.id, coverImg: this.buiderImgSrc( val.coverImg)}))
      .switchMap(v => this.projectService$.update(v))
      .subscribe(project => {
          const index = this.projects.map(p => p.id).indexOf(project.id);
          this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)];
          this.cd.detectChanges();
      });
  }
  launchDelDialog(project) {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
        {data: {title: '删除项目', content: '您确认删除此项目?'}});
    dialogRef.afterClosed()
      .take(1) // 只取一个值
      .filter(n => n)
      .switchMap( s => this.projectService$.delete(project))
      .subscribe(result => {
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
