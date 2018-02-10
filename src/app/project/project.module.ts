import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InivteProjectComponent } from './inivte-project/inivte-project.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ],
  entryComponents: [
    InivteProjectComponent,
    NewProjectComponent,
  ],
  declarations: [
    InivteProjectComponent,
    NewProjectComponent,
    ProjectListComponent,
    ProjectItemComponent
  ]
})
export class ProjectModule { }
