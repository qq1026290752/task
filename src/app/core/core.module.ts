import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../utlis/svg.utils.module';
import 'hammerjs';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule,
  icon: MatIconRegistry, dom: DomSanitizer) {
    if (core) {
      throw new Error('核心包已经初始化完毕');
    }
    loadSvgResources(icon, dom);
  }
}
