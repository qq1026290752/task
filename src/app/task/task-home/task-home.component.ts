import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../animation/routing.animations';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routingAnimations') routingState;
  taskLists = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一:去星巴克买杯子',
          completd: false,
          priority: 2,
          owner: {
            id: 1,
            name: 'zhangsan',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: '任务一:完成老板布置得PPT作业',
          completd: false,
          priority: 1,
          owner: {
            id: 1,
            name: 'lisi',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        }

      ],
    }, {
      id: 1,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务三:项目代码评审',
          completd: true,
          priority: 3,
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date()
        },
        {
          id: 2,
          desc: '任务六:制定项目计划',
          completd: true,
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date()
        }

      ],

    },
  ];
  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  onNewTasksDialog() {
    this.dialog.open(NewTaskComponent, {data: {title: '新建任务'} });
  }
  launchMoveTaskDialog() {
    const dialogRef =  this.dialog.open(CopyTaskComponent, {data: {lists : this.taskLists} });
  }
  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task} });
  }
  launchDelAllTasksDialog() {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
      {data: {title: '删除列表', content: '您确认删除此列表?'}});
      dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  openNerTaskListDialog() {
    this.dialog.open(NewTaskListComponent, {data: {title: '添加任务列表'} });
  }
  launchUpdataTaskListDialog() {
    this.dialog.open(NewTaskListComponent, {data: {title: '修改任务列表'} });
  }
  launchDelTaskListDialog() {
    const dialogRef =  this.dialog.open(ConfirmDialogComponent,
      {data: {title: '删除任务列表', content: '您确认删除此任务列表?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  handleQuickTask(desc: string ) {
      console.log(desc);
  }
}
